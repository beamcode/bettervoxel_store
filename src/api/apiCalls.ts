// FILE: apiCalls.ts

import { fetchApi } from "./fetchApi"
import {
  DefaultResponse,
  AccountInfoResponse,
  AccountsResponse,
  LoginResponse,
  MarketplaceResponse,
  PublishedAssetsResponse,
  PurchasedAssetsResponse,
  AssetMetadataResponse,
} from "@/types/api.types"

/* --------------------------
   AUTH-RELATED ENDPOINTS
   -------------------------- */

export async function login(username_or_email: string, password: string): Promise<LoginResponse> {
  return fetchApi<LoginResponse>("/account/login", {
    method: "POST",
    body: { username_or_email, password },
    auth: false,
  })
}

export async function logout(): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>("/account/logout", {
    method: "POST",
    auth: true,
  })
}

/* --------------------------
   ACCOUNT-RELATED ENDPOINTS
   -------------------------- */

type AccountData = {
  username: string
  email: string
  password: string
  firstname: string
  lastname: string
  dob: string
}

export async function signUp(accountData: AccountData): Promise<LoginResponse> {
  return fetchApi<LoginResponse>("/account/create", {
    method: "POST",
    body: accountData,
    auth: false,
  })
}

export async function deleteAccount(password: string): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>("/account/delete", {
    method: "POST",
    body: { password },
    auth: true,
  })
}

export async function getAccountData(): Promise<AccountInfoResponse> {
  return fetchApi<AccountInfoResponse>("/account/infos", {
    method: "POST",
    auth: true,
  })
}

export async function updateAccount(params: {
  firstname?: string
  lastname?: string
  dob?: string
  voxcoins?: number
  password?: string
  username?: string
  email?: string
}): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>("/account/edit/infos", {
    method: "POST",
    body: params,
    auth: true,
  })
}

export async function getAdminsList(): Promise<AccountsResponse> {
  return fetchApi<AccountsResponse>("/account/list/admin", {
    method: "POST",
    auth: true,
  })
}

export async function getUsersList(): Promise<AccountsResponse> {
  return fetchApi<AccountsResponse>("/account/list/users", {
    method: "POST",
    auth: true,
  })
}

export async function deleteUser(userId: string): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/account/delete/${userId}`, {
    method: "POST",
    auth: true,
  })
}

/* --------------------------
   ADMIN / VOXCOIN / ETC.
   -------------------------- */

export async function revokeAdmin(email: string): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/accounts/admin/revoke/${email}`, {
    method: "POST",
    auth: true,
  })
}

export async function grantAdmin(email: string): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/accounts/admin/grant/${email}`, {
    method: "POST",
    auth: true,
  })
}

export async function buyVoxcoins(amount: string): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/voxcoins/buy/${amount}`, {
    method: "POST",
    auth: true,
  })
}

/* --------------------------
   ASSET-RELATED ENDPOINTS
   -------------------------- */

type MarketplaceParams = {
  start: number
  count: number
  search?: string
  sortBy?: string
  sortDir?: string
  minPrice?: string
  maxPrice?: string
}

export async function getMarketplaceAssets(
  params: MarketplaceParams
): Promise<MarketplaceResponse> {
  return fetchApi<MarketplaceResponse>("/list", {
    method: "POST",
    body: params,
    auth: false,
  })
}

export async function getPublishedAssets(): Promise<PublishedAssetsResponse> {
  return fetchApi<PublishedAssetsResponse>("/published", {
    method: "POST",
    auth: true,
  })
}

export async function getPurchasedAssets(): Promise<PurchasedAssetsResponse> {
  return fetchApi<PurchasedAssetsResponse>("/purchased", {
    method: "POST",
    auth: true,
  })
}

export async function editAsset(
  assetId: string,
  data: { name: string; description: string; tags: string[]; price: number }
): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/edit/${assetId}`, {
    method: "POST",
    body: data,
    auth: true,
  })
}

export async function deleteAsset(assetId: string): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/delete/${assetId}`, {
    method: "POST",
    auth: true,
  })
}

// export async function downloadAsset(assetId: string): Promise<Blob | DefaultResponse> {
//   return fetchApi<Blob | DefaultResponse>(`/download/${assetId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/octet-stream",
//     },
//     auth: true,
//   })
// }

export async function publishAsset(
  assetId: string,
  data: { name: string; description: string; tags: string[]; price: number }
): Promise<DefaultResponse> {
  return fetchApi<DefaultResponse>(`/publish/${assetId}`, {
    method: "POST",
    body: data,
    auth: true,
  })
}

export async function getAssetMetadata(assetId: string): Promise<AssetMetadataResponse> {
  return fetchApi<AssetMetadataResponse>(`/preview/${assetId}`, {
    method: "POST",
    auth: true,
  })
}

export async function buyAsset(assetId: string): Promise<AssetMetadataResponse> {
  return fetchApi<AssetMetadataResponse>(`/buy/${assetId}`, {
    method: "POST",
    auth: true,
  })
}
