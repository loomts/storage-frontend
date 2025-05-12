/**
 * 主题管理工具
 */
export default {
  /**
   * 切换主题模式
   */
  toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  },
  
  /**
   * 初始化主题
   */
  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 根据存储的主题或系统偏好设置主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
    }
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', e => {
        if (localStorage.getItem('theme')) return;
        document.body.classList.toggle('dark-theme', e.matches);
      });
    }
  }
};
