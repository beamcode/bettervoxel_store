// account type definition
export interface Account {
  _id: string
  username: string
  email: string
  firstname: string
  lastname: string
  dob: string
  voxcoins: number
  role: string
  created_at: string
  updated_at: string
}

// types for asset
export interface Asset {
  asset_type: string
  preview_url: string
  author: string
  id: string
  name: string
  description: string
  price: number
  download_count: number
  likes: number
  dislikes: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface MarketplaceSettings {
  count: number
  start: number
  total: number
}
