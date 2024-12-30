/*
 * @Description:
 * @Author: caoyalan
 * @Email: 2056246231@qq.com
 * @LastEditTime: 2024-12-30 11:01:35
 * @FilePath: \my-app\api.ts
 */
import nextConfig from "./next.config";

const apiPath = "/users";
const backendUrl = nextConfig.env?.BACKEND_URL || process.env.BACKEND_URL || "";
const response = await fetch(`${backendUrl}${apiPath}`);
