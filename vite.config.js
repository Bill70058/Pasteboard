import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import less from 'vite - plugin - less';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    less({
      // 在这里可以配置less的相关选项，如修改主题等
      // 例如，设置less变量覆盖
      modifyVars: {
        'primary - color': '#1890ff',
      },
      javascriptEnabled: true,
    }),
  ],
})
