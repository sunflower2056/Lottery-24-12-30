/*
 * @Description:
 * @Author: caoyalan
 * @Email: 2056246231@qq.com
 * @LastEditTime: 2024-12-30 16:29:07
 * @FilePath: \my-app\next.config.ts
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_URL:
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://chaojing-film.com/ossService",
  },
  output: "export",
};

export default nextConfig;
