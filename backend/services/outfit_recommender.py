import pinecone
import numpy as np
from utils.encode_prompt import encode_text
from utils.pinecone_store import get_pinecone_index
from config import pinecone_key
from utils.prompt_preprocess import prompt_preprocessing

def get_outfit(prompts, outfit_options):
    if not isinstance(prompts, list) or len(prompts) == 0:
        print("Masukkan list prompt minimal satu.")
        return []

    print("Searching your outfit...")

    text_embeddings = [encode_text(p).tolist() for p in prompts]
    index = get_pinecone_index(api_key=pinecone_key)
    
    final_selections = []
    previous_selected_embedding = None
    
    for i, (prompt, text_emb) in enumerate(zip(prompts, text_embeddings)):
        if i < len(outfit_options):
            category = outfit_options[i]
        else:
            category = "Unknown"
            
        print(f"Processing prompt for category: {category}")

        top_k = 1 if i == 0 else 3
        
        response = index.query(
            vector=text_emb,
            top_k=top_k,
            include_metadata=True,
            filter={"category": category} if category in outfit_options else {}
        )
        
        candidates = []
        for match in response.matches:
            metadata = match.metadata
            img_path = metadata.get("img_path")
            item_category = metadata.get("category", "Uncategorized")
            score = match.score

            vector_response = index.fetch(ids=[match.id])
            item_vector = vector_response.vectors[match.id].values
            
            candidates.append({
                "img_path": img_path,
                "category": item_category,
                "score": score,
                "prompt": prompt,
                "vector": item_vector
            })
        
        if i == 0:
            if candidates:
                selected_item = candidates[0]
                final_selections.append(selected_item)
                previous_selected_embedding = selected_item["vector"]
                print(f"Selected for {category}: {selected_item['img_path']} (score: {selected_item['score']})")
        else:
            if candidates and previous_selected_embedding is not None:
                for candidate in candidates:
                    similarity = np.dot(candidate["vector"], previous_selected_embedding) / (
                        np.linalg.norm(candidate["vector"]) * np.linalg.norm(previous_selected_embedding)
                    )
                    candidate["cross_similarity"] = similarity
                
                candidates.sort(key=lambda x: x["cross_similarity"], reverse=True)
                selected_item = candidates[0]
                final_selections.append(selected_item)
                previous_selected_embedding = selected_item["vector"]
                print(f"Selected for {category}: {selected_item['img_path']} (similarity: {selected_item['cross_similarity']})")

    result = [(item["img_path"], item["score"], item["category"], item["prompt"]) 
              for item in final_selections]
    
    print("FINAL RESULTS:", result)
    return result

def outfit_picker(prompt_from_user, outfit_options):
    short_prompts = prompt_preprocessing(prompt_from_user, outfit_options)
    print(short_prompts)
    prompts = list(short_prompts.values())
    return get_outfit(prompts, outfit_options)