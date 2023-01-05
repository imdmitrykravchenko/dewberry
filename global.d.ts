declare const STATS_FILE_PATH: string;

declare const ASSETS_PATH: string;

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}