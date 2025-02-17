# Document Tracking System 文件追蹤系統

這是一個使用 Node.js 和 Express 構建的文件追踪系統，允許用戶生成和管理文件的 QR Code。

## 系統目的

以往在文件傳遞時，可能會需要透過填寫便條紙及黏貼便挑紙在文件上，並經過多人傳遞後才會送達，
時常會碰到便條紙遺失、不足，或是文件下一關流程不知道要到哪等等問題，造成文件傳遞的時間成本、溝通成本增加。

## 改善效益

1. 減少文書耗材成本：QRCode僅需印製一次便可無限次使用。
2. 降低文件遺失風險：避免便條紙或其他備註在傳遞過程中遺失。
3. 降低溝通時間成本：可以編輯收件人、下一位收件人來避免同仁要相互確認詢問下一關目的地的時間成本。



## 項目結構

DocTracking
├── node_modules
├── views
│ ├── index.ejs
│ ├── qrcode.ejs
│ ├── qrcodes.ejs
│ └── document.ejs
├── package.json
├── server.js



## 安裝指南

1. 確保已安裝 Node.js 和 npm。你可以通過以下命令檢查安裝版本：

   ```bash
   node -v
   npm -v

2. Clone 或下載此項目到你的本地機器上。

3. 打開終端或命令提示符，導航到項目文件夾：
cd YOUR_WORKSPACE\DocTracking\


4. 安裝所需的 npm 包：
npm install


## 運行項目
1. 運行以下命令以啟動服務器：
node server.js

2. 在你的瀏覽器中打開以下網址以訪問應用程序：
http://localhost:3000


## 使用方法
#   生成 QR Code
    1. 打開應用程序首頁 http://localhost:3000。
    2. 填寫表單，然後點擊 “生成 QR Code” 按鈕。
    3. 生成的 QR Code 會顯示在新頁面，並包含一個鏈接，用於查看和編輯文件信息。
    
#   生成多個 QR Code
    1. 在首頁，導航到 “快速生成多個 QR Code” 部分。
    2. 填寫表單並指定要生成的 QR Code 數量。
    3. 點擊 “生成多個 QR Code” 按鈕。
    4. 所有生成的 QR Code 會顯示在新頁面。
    
#   查看和編輯文件
    1. 掃描 QR Code 或打開顯示的鏈接以查看文件信息。
    2. 在文件頁面，你可以選擇編輯文件信息並保存更改。
    
#   文件說明
        server.js：主要的服務器文件，包含所有後端邏輯。
        views 文件夾：存儲所有的 EJS 模板文件。
        index.ejs：首頁模板，用於生成 QR Code。
        qrcode.ejs：顯示單個 QR Code 的模板。
        qrcodes.ejs：顯示多個 QR Code 的模板。
        document.ejs：顯示和編輯文件信息的模板。
        package.json：項目的配置文件，包含項目信息和依賴包。

#   注意事項
        如果你在不同的網絡環境下運行此應用程序，請確保 server.js 中的 serverAddress 變量已設置為你的實際域名或 IP 地址。
        確保打開相應的Port（預設為 3000），以便其他設備可以訪問該應用程序。
        請更新 server.js 文件中的 departments ，替換成您的部門。


## 系統擴充計畫

1.結合內部 APP，以便透過APP權限控管，管理QRCode讀取的權限，或經APP授權可直接存取內部網路層不受防火牆限制。
挑戰：需結合APP。

2.結合內部系統流程，在填寫表單時，輸入QRCode編號進行流程同步，當表單送出時，電子表單流程自動更新寄件人、收件人、下一位收件人資訊，取代原先人工填寫。
挑戰：需串接MIS系統並需設計重新關聯的相關邏輯及權限。

3.RFID化，將QRCode更改為RFID，在辦公室放至文件集中窗口，當文件經過窗口讀取器時，會自動更新該文件位置，以便追蹤目前文件流向。
挑戰：成本較高、仍會因同仁作業中而無法更新最新狀態。
