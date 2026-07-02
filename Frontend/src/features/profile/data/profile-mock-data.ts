import type { ProfileData } from '../types/profile.types'

export const MOCK_PROFILE_DATA: ProfileData = {
  user: {
    id: 'usr-001',
    displayName: 'Elaris Thorne',
    username: '@elaris_thorne',
    email: 'elaris.t@luminovels.com',
    avatarUrl: undefined,
    memberSince: 'Tháng 10 2023',
    isVerified: true
  },

  wallet: {
    balance: 500.0,
    currency: 'Lumi Coins'
  },

  transactions: [
    {
      id: 'TXN-240518-001',
      type: 'topup',
      title: 'Nạp Lumi Coins',
      description: 'Thanh toán qua ví điện tử',
      amount: '+200.00',
      status: 'Thành công',
      date: '18 Tháng 5 2026, 20:14',
      method: 'MoMo',
      reference: 'LUMI-MOMO-8142'
    },
    {
      id: 'TXN-240517-022',
      type: 'spend',
      title: 'Mở khóa chương',
      description: 'The Obsidian Spires - Chapter 42',
      amount: '-15.00',
      status: 'Thành công',
      date: '17 Tháng 5 2026, 09:32',
      method: 'Lumi Coins',
      reference: 'READ-OBS-0042'
    },
    {
      id: 'TXN-240516-014',
      type: 'spend',
      title: 'Mua gói đọc',
      description: 'Premium Reading Pass',
      amount: '-120.00',
      status: 'Thành công',
      date: '16 Tháng 5 2026, 22:08',
      method: 'Lumi Coins',
      reference: 'PASS-PREMIUM-30D'
    },
    {
      id: 'TXN-240510-007',
      type: 'topup',
      title: 'Nạp Lumi Coins',
      description: 'Thanh toán qua ngân hàng',
      amount: '+500.00',
      status: 'Thành công',
      date: '10 Tháng 5 2026, 14:05',
      method: 'VNPay',
      reference: 'LUMI-VNP-3309'
    },
    {
      id: 'TXN-240503-019',
      type: 'spend',
      title: 'Mở khóa chương',
      description: 'Neon Walker - Chapter 18',
      amount: '-15.00',
      status: 'Thành công',
      date: '3 Tháng 5 2026, 21:47',
      method: 'Lumi Coins',
      reference: 'READ-NEO-0018'
    }
  ],

  collections: [
    {
      key: 'bookmarks',
      label: 'Đánh dấu trang',
      stories: [
        {
          id: 'story-bm-1',
          novelId: 'novel-bm-1',
          title: 'The Obsidian Spires',
          meta: 'Đã đánh dấu chương 42',
          progress: 72,
          path: '/vong-am-toa-thap-neon-walker/chuong-1-tia-lua-dau-tien-1',
          coverUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAGLl8c3JoTxUTAXMvStFatxo3UEuaAVtwB4pIDnyKnxvJSpsC5KLnZ5zBdLlCFvEXu8ToDD_eVvU3wLD5jnwe8DSJjzhHgHMPpDySckK1MlYmrA98Zav30oQlXWDVrzs4k4R8ee3DLbCPhjy-Go9iuJUQFlYIH2P83qPZs2o2LWYj2Jzz5NJ6Gr_f-gQDoKjjEWiDOtJNpjZjBmswiffpB0-y1rA-LwJ8X6p4_1SyOHurGjDY0Hgaa3WMXHir3dC6kn38CxKTyrw'
        },
        {
          id: 'story-bm-2',
          novelId: 'novel-bm-2',
          title: 'Neon Walker',
          meta: 'Đã đánh dấu chương 18',
          progress: 38,
          path: '/vong-am-toa-thap-neon-walker/chuong-1-tia-lua-dau-tien-1',
          coverUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDkcPy_iq4yX-8hoMmL0T6MvLCuFvV5DV_M3X3ebn72NoDn5Ijw5KvDgEgoxG15jRfcruLt6CozvvmrKR96_Agbj1MxPlWpLRvFCjYC64bOipc63GQDn-A5sv5kIGbirFvPXe2Y4FSa6uylXzksygob8MV7VUaalNeLfSB-ApDQrwH2oUPzR2Ljh3bS4AGSU7p2ks-cPdBgrjUJkED0RHWM197Rfq48Aq06tkwDMggqI-fHsNE3iUQjKx7ZVRwj4CrMQDwT9-rI1A'
        }
      ]
    },
    {
      key: 'reading-list',
      label: 'Danh sách đọc',
      stories: [
        {
          id: 'story-rl-1',
          novelId: 'novel-rl-1',
          title: 'The Obsidian Spires',
          meta: 'Đã đọc 72%',
          progress: 72,
          path: '/vong-am-toa-thap-neon-walker/chuong-1-tia-lua-dau-tien-1',
          coverUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAGLl8c3JoTxUTAXMvStFatxo3UEuaAVtwB4pIDnyKnxvJSpsC5KLnZ5zBdLlCFvEXu8ToDD_eVvU3wLD5jnwe8DSJjzhHgHMPpDySckK1MlYmrA98Zav30oQlXWDVrzs4k4R8ee3DLbCPhjy-Go9iuJUQFlYIH2P83qPZs2o2LWYj2Jzz5NJ6Gr_f-gQDoKjjEWiDOtJNpjZjBmswiffpB0-y1rA-LwJ8X6p4_1SyOHurGjDY0Hgaa3WMXHir3dC6kn38CxKTyrw'
        },
        {
          id: 'story-rl-2',
          novelId: 'novel-rl-2',
          title: 'Vong Am Toa Thap',
          meta: 'Tiếp theo: Chương 12',
          progress: 24,
          path: '/vong-am-toa-thap-neon-walker/chuong-1-tia-lua-dau-tien-1',
          coverUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDkYAjy7SxJfyj1NOYr36ajYRP7VzxBKJ6hUGmKPv8jMjljUJTTzZho9GTB4xbsNa-Ui7ALTYVXCLORCtBGqeXnyJTgHDWQu_MzC3FGyYS13Mh7lwPGJtdIE2CZpoao-hHtT9Oe-x_lQrHTUW8z2bATQ-uLrEPyuyKeGmQD6EtiQ3aE4PRM2zh1YLnPd82J6NzPsWSPY3vvQQTgdV0BUdEr7PQTQXuie-ihTdfuYo1FIkWkfKiGtUXNGhxeH3piLjfTqe-MJDaEEA'
        }
      ]
    },
    {
      key: 'history',
      label: 'Lịch sử đọc',
      stories: [
        {
          id: 'story-h-1',
          novelId: 'novel-h-1',
          title: 'The Obsidian Spires',
          meta: 'Đã đọc 72% - 2 giờ trước',
          progress: 72,
          path: '/vong-am-toa-thap-neon-walker/chuong-1-tia-lua-dau-tien-1',
          coverUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAGLl8c3JoTxUTAXMvStFatxo3UEuaAVtwB4pIDnyKnxvJSpsC5KLnZ5zBdLlCFvEXu8ToDD_eVvU3wLD5jnwe8DSJjzhHgHMPpDySckK1MlYmrA98Zav30oQlXWDVrzs4k4R8ee3DLbCPhjy-Go9iuJUQFlYIH2P83qPZs2o2LWYj2Jzz5NJ6Gr_f-gQDoKjjEWiDOtJNpjZjBmswiffpB0-y1rA-LwJ8X6p4_1SyOHurGjDY0Hgaa3WMXHir3dC6kn38CxKTyrw'
        },
        {
          id: 'story-h-2',
          novelId: 'novel-h-2',
          title: 'Neon Walker',
          meta: 'Đã đọc 38% - hôm qua',
          progress: 38,
          path: '/vong-am-toa-thap-neon-walker/chuong-1-tia-lua-dau-tien-1',
          coverUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDkcPy_iq4yX-8hoMmL0T6MvLCuFvV5DV_M3X3ebn72NoDn5Ijw5KvDgEgoxG15jRfcruLt6CozvvmrKR96_Agbj1MxPlWpLRvFCjYC64bOipc63GQDn-A5sv5kIGbirFvPXe2Y4FSa6uylXzksygob8MV7VUaalNeLfSB-ApDQrwH2oUPzR2Ljh3bS4AGSU7p2ks-cPdBgrjUJkED0RHWM197Rfq48Aq06tkwDMggqI-fHsNE3iUQjKx7ZVRwj4CrMQDwT9-rI1A'
        }
      ]
    }
  ]
}
