# 故事換花

## 上架到 GitHub Pages

直接把壓縮檔裡的 `index.html` 上傳到 GitHub 儲存庫最外層。在 Settings → Pages 選擇 Deploy from a branch，選 main 和 / (root)，按 Save。圖片、版面、動畫和網頁程式已經包在同一個 HTML。預設保留原網站花朵顧問的預寫回覆。訂購表單供試填，沒有接收訂單的服務。

## 改用生成式 AI（選用）

1. 在 `ai-worker/wrangler.toml` 把 `SITE_ORIGIN` 改成你的 GitHub Pages 網站來源，例如 `https://你的帳號.github.io`。如果有自訂網域，填自訂網域的來源。只填協定和主機名稱，不加儲存庫路徑或尾端斜線。
2. 在終端機進入 `ai-worker` 資料夾。執行 `npx wrangler login`、`npx wrangler deploy`，再執行 `npx wrangler secret put OPENAI_API_KEY`，依提示輸入你的 OpenAI API 金鑰。這是使用獨立的 OpenAI API 帳戶與用量計費。
3. 打開上傳 GitHub 的 `index.html`，找到 `name="flower-ai-endpoint"`，把同一行的空白 `content=""` 填入 Worker 公開網址。只把網址放進 HTML，金鑰留在 Cloudflare 的 encrypted secret。
4. 提交 GitHub 更新後，從正式網站輸入不同的送花故事，確認出現符合故事的建議。聊天內容會傳至 AI 服務處理，請勿在聊天中輸入地址、電話等個資。

公開端點提供每 IP 用量限制。若公開推廣且需要限制整體費用，可在所使用的 API 專案設定用量與告警。

## 修改網站原始碼

進入 `source` 後執行 `npm ci` 和 `npm run dev`。修改完成後執行 `npm run build`，用 `dist/index.html` 更新 GitHub 上的單檔版。使用自訂 AI 端點時，請先把該網址填入原始碼的 `index.html`。
