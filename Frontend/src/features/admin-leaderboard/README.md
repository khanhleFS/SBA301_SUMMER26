# Tài liệu tính năng: Admin Leaderboard

## 🎯 Mục đích
Trang leaderboard hiển thị bảng xếp hạng truyện và tác giả theo nhiều nhóm thống kê.

## 🧩 Thành phần chính
- `leaderboard-feature.tsx`: entry component, chỉ lo provider và loading gate.
- `components/leaderboard-sections.tsx`: UI chính của leaderboard.
- `context/leaderboard.context.tsx`: bọc `useQuery` cho server-state.
- `services/leaderboard.service.ts`: service mock cho dữ liệu leaderboard.

## 🔗 Mapping component -> service
- `leaderboard-feature.tsx` -> `LeaderboardProvider` + `useLeaderboard()`.
- `components/leaderboard-sections.tsx` -> consume `storyPodium`, `storyRankings`, `authorPodium`, `authorList` từ `useLeaderboard()`.
- `context/leaderboard.context.tsx` -> gọi `fetchLeaderboardData()`.
- `services/leaderboard.service.ts` -> đọc mock từ [src/services/mock-data.ts](../../services/mock-data.ts).

## ✅ Trạng thái hiện tại
- Server-state đã chuyển sang TanStack Query.
- Feature entry đã mỏng hơn, phần podium/ranking được gom vào một section file riêng.
- Avatar/cover mock đã thống nhất bằng placeholder chung.

## 🧪 Mock data & placeholder images
- Dữ liệu mock chung nằm ở [src/services/mock-data.ts](../../services/mock-data.ts).
- Ảnh cover/avatar mock đã chuyển sang placeholder dùng chung để không lệch style giữa các feature.

## TODO
- Thay `fetchLeaderboardData()` bằng API thật.
- Nếu leaderboard cần filter theo thời gian thực, thêm query key theo `timeRange`.