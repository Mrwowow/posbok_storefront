import type { SyntheticEvent } from "react"

/** Fallback image shown when a product has no uploaded image (or its URL fails to load). */
export const PRODUCT_PLACEHOLDER_IMAGE = "/posbok-no-image.svg"

/** onError handler for <img>/<Image>: swap a broken image URL for the POSbok placeholder once. */
export function handleProductImageError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  // Guard against an infinite loop if the placeholder itself ever fails to load.
  if (img.src.endsWith(PRODUCT_PLACEHOLDER_IMAGE)) return
  img.removeAttribute("srcset")
  img.src = PRODUCT_PLACEHOLDER_IMAGE
}
