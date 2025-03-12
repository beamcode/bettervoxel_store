import { Asset, MarketplaceSettings, Account } from "./objects.types"

export interface DefaultResponse {
  success?: object
  error?: { message: string; status: number }
}

export interface LoginResponse {
  success?: { token: string }
  error?: ErrorResponse
}

export interface AccountInfoResponse {
  success?: Account
  error?: ErrorResponse
}

export interface AccountsResponse {
  success?: Account[]
  error?: ErrorResponse
}

export interface ErrorResponse {
  status: number
  message: string
}

export interface MarketplaceResponse {
  success?: { data: Asset[]; infos: MarketplaceSettings }
  error?: ErrorResponse
}

export interface PublishedAssetsResponse {
  success?: Asset[]
  error?: ErrorResponse
}

export interface PurchasedAssetsResponse {
  success?: Asset[]
  error?: ErrorResponse
}

export interface AssetMetadataResponse {
  success?: Asset
  error?: ErrorResponse
}
