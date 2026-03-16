# Hướng dẫn chạy project

Project này được tạo bằng **Create React App**.

## 1. Yêu cầu trước khi chạy

Trước khi chạy project, cần cài đặt:

* **Node.js** (khuyến nghị version 18+)
* **npm** (được cài sẵn khi cài Node.js)

Kiểm tra bằng lệnh:

```
node -v
npm -v
```

---

# 2. Cài đặt project

Sau khi tải project về (clone hoặc download), mở terminal tại thư mục project và chạy:

```
npm install
```

Lệnh này sẽ cài toàn bộ thư viện cần thiết cho project từ file `package.json`.

Chỉ cần chạy **1 lần duy nhất** khi mới tải project.

---

# 3. Chạy project ở môi trường Development

Chạy lệnh:

```
npm start
```

Sau đó mở trình duyệt:

```
http://localhost:3000
```

Ứng dụng React sẽ chạy ở chế độ **development mode**.

Các đặc điểm của chế độ này:

* Tự reload khi sửa code
* Hiển thị lỗi trực tiếp trên trình duyệt
* Phù hợp để phát triển

---

# 4. Build project cho môi trường Production

Khi muốn build project để deploy, chạy:

```
npm run build
```

Sau khi chạy xong:

* thư mục **build/** sẽ được tạo
* chứa toàn bộ code đã được tối ưu cho production

Có thể deploy thư mục `build` lên các nền tảng như:

* Vercel
* Netlify
* Firebase Hosting
* Server riêng

---

# 5. Chạy test (nếu project có test)

```
npm test
```

Lệnh này sẽ chạy test ở chế độ watch.

---

# 6. Cấu trúc lệnh thường dùng

| Lệnh            | Chức năng                |
| --------------- | ------------------------ |
| `npm install`   | Cài toàn bộ thư viện     |
| `npm start`     | Chạy project local       |
| `npm run build` | Build project production |
| `npm test`      | Chạy test                |

---

# 7. Lưu ý quan trọng

Nếu project không chạy được, thử:

```
rm -rf node_modules
npm install
npm start
```

Hoặc trên Windows:

```
rmdir /s node_modules
npm install
npm start
```

---

# 8. Tài liệu tham khảo

* https://create-react-app.dev/
* https://react.dev/
