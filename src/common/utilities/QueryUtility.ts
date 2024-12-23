import { InfiniteData } from "@tanstack/query-core"
import { CollectionUtility } from "@/common/utilities/CollectionUtility"

export class QueryUtility {
  static isInfiniteLoaded (data: InfiniteData<unknown>): boolean {
    return data && CollectionUtility.isNotEmpty(data.pages) && data.pages[0] !== undefined
  }
}
