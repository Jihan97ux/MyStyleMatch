# 👗 MyStyleMatch — Outfit Recommender System

A vector-based recommendation engine that leverages CLIP embeddings and OpenAI NLP to match user prompts with fashion items. Outfit images are encoded using CLIP and stored in Pinecone, enabling efficient semantic search based on natural language descriptions.

---

## ✨ Features

* 🔎 Search for outfits using natural language prompts
  *(e.g., "I want to hang out in a flower park, recommend me a cute mini summer outfit")*
* 🧠 Vector similarity search powered by Pinecone
* 🖼️ Image-text embeddings using OpenAI CLIP model

---

## 🚀 How It Works

### 1️⃣ Landing Page

* Main page displaying project description and simple navigation.
* The system checks if user data already exists in the dataset:

  * If **data exists**, redirect to the **Prompt Section**.
  * If **no data exists**, redirect to the **Upload Section**.

| Landing Page                                                                                      |
| ------------------------------------------------------------------------------------------------- |
| ![Landing Page](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/landing_page.JPG) |

---
| Feature Page                                                                                      |
| ------------------------------------------------------------------------------------------------- |
| ![Feature Page](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/fitur_utama.JPG) |

---

### 2️⃣ Upload Section

* Users upload outfit images to be processed.
* Uploaded images are encoded using CLIP and the embeddings are stored in Pinecone.
* After a successful upload, an alert will appear asking whether to proceed to the **Prompt Section**.

| Upload Section                                                                                                |
| ------------------------------------------------------------------------------------------------------------- |
| ![Upload Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/upload_section.JPG)         |
| ![Upload Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/upload_outfit.JPG)          |
| ![Upload Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/upload_outfit_loading.JPG)  |
| ![Upload Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/upload_outfit_berhasil.JPG) |

* If the user chooses **Decline**, they will remain in the Upload Section.

---

### 3️⃣ Prompt Section

* Users select the desired outfit category.
  *(e.g., \["Dress", "Sandal"])*
* Users enter a natural language description of the outfit they want.
  *(e.g., "I want to hang out in a flower park, recommend me a cute mini summer outfit")*
* The system processes the prompt into a concise version based on selected categories.
* The prompt is embedded and matched against outfit embeddings stored in Pinecone.

| Prompt Section                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- |
| ![Prompt Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/prompt_section.JPG)             |
| ![Prompt Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/prompt_rekomendasi.JPG)         |
| ![Prompt Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/prompt_rekomendasi_loading.JPG) |

---

### 4️⃣ Result Section

* After a successful search, users are navigated to the **Result Section**.
* The most relevant outfit is displayed, based on semantic vector similarity from Pinecone.

| Result Section                                                                                           |
| -------------------------------------------------------------------------------------------------------- |
| ![Result Section](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/hasil_rekomendasi.JPG) |

---

### 5️⃣ Error Handling

The system handles various errors and provides clear feedback:

* ❗ Attempting to upload an image without selecting a category.
* ❗ Uploading an outfit image that already exists in the dataset.
* ❗ Requesting an outfit category not available in the dataset.
* ❗ Submitting an empty prompt or not selecting an outfit category.

| Error Examples                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------ |
| ![Error](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/upload_outfit_missing_kategori.JPG)                   |
| ![Error](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/upload_outfit_same_image.JPG)                        |
| ![Error](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/prompt_rekomendasi_kategori_not_in_dataset.JPG)       |
after updated handle submit promot, dress and skirt are not compatible, system return alert, but user can still continue the search
| ![Error](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/prompt_rekomendasi_kategori_not_in_dataset_alert.JPG) |
| ![Error](https://github.com/Jihan97ux/MyStyleMatch/blob/main/screenshots/hasil_rekomendasi_dengan_kategori_not_in_dataset.JPG) |

---

## 🔗 Demo

▶️ [Try MyStyleMatch on Google Colab](https://colab.research.google.com/drive/1tziI0iiYD7UgJTRwo746NCt3ukd2EVHi?usp=sharing)

---

## 🛠️ Tech Stack

* 🖼️ OpenAI CLIP for image-text embeddings
* 🗄️ Pinecone vector database for similarity search
* 🐍 Python, FastAPI
* ⚙️ Next, Typescript
* 💻 Google Colab for prototyping and demonstration

---

## 📊 Example Use Case

> **Selected Outfit Categories:**
> *\["Dress", "Heels"]*

> **Prompt Input:**
> *"I want to attend my friend's wedding, I don't know what to wear, recommend me an elegant yet simple outfit."*

> **Result:**
> The system retrieves the outfit that best matches the semantic meaning of the prompt with best compatibility between selected outfit categories. 

---

## 📢 Acknowledgements

* OpenAI CLIP model for image-text embeddings.
* Pinecone vector database for scalable vector search.
* Inspired by AI-driven recommendation systems in the fashion industry.

---
