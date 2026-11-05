export interface DemoMeta {
  /** Component file name inside src/components/lib/<category>/ */
  file: string;
  /** Library folder ('.' for root-level components). */
  category: string;
  /** Snippet shown in the "Usage" section. */
  usage: string;
}
