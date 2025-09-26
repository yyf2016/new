const routes = {
  overview: {
    title: '概览',
    render() {
      return `
        <section class="panel">
          <h1>实验室概览</h1>
          <p>欢迎来到实验室网站。这里可以查看设备、预约使用并联系管理员。</p>
        </section>
        <div class="grid" style="margin-top:16px;">
          <div class="col-4 stat"><div class="label">本周预约</div><div class="value">12</div></div>
          <div class="col-4 stat"><div class="label">可用设备</div><div class="value">27</div></div>
          <div class="col-4 stat"><div class="label">维护中</div><div class="value">3</div></div>
        </div>
      `;
    }
  },
  equipment: {
    title: '设备',
    render() {
      return `
        <section class="panel">
          <h1>设备列表</h1>
          <table class="table">
            <thead>
              <tr><th>名称</th><th>状态</th><th>位置</th></tr>
            </thead>
            <tbody>
              <tr><td>高分辨率显微镜</td><td>可用</td><td>A-203</td></tr>
              <tr><td>离心机</td><td>维护中</td><td>B-112</td></tr>
              <tr><td>光谱分析仪</td><td>可用</td><td>A-118</td></tr>
              <tr><td>培养箱</td><td>可用</td><td>C-025</td></tr>
            </tbody>
          </table>
        </section>
      `;
    }
  },
  booking: {
    title: '预约',
    render() {
      return `
        <section class="panel">
          <h1>设备预约</h1>
          <p>选择设备与时间，我们会为你保留时段。</p>
          <form id="booking-form" style="margin-top:12px; display:grid; gap:12px; max-width:520px;">
            <label>
              <span>设备</span>
              <select name="device" required style="width:100%; padding:10px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); background:rgba(0,0,0,0.2); color:var(--text);">
                <option value="显微镜">显微镜</option>
                <option value="离心机">离心机</option>
                <option value="光谱分析仪">光谱分析仪</option>
              </select>
            </label>
            <label>
              <span>日期</span>
              <input type="date" name="date" required style="width:100%; padding:10px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); background:rgba(0,0,0,0.2); color:var(--text);">
            </label>
            <label>
              <span>时间段</span>
              <input type="time" name="time" required style="width:100%; padding:10px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); background:rgba(0,0,0,0.2); color:var(--text);">
            </label>
            <button class="button" type="submit">提交预约</button>
          </form>
          <div id="booking-result" style="margin-top:12px;"></div>
        </section>
      `;
    }
  },
  contact: {
    title: '联系我们',
    render() {
      return `
        <section class="panel">
          <h1>联系信息</h1>
          <p>邮箱：lab@example.com</p>
          <p>地址：某大学科研楼 A 座 203</p>
        </section>
      `;
    }
  }
};

function setActiveNav(routeKey) {
  const items = document.querySelectorAll('.nav-item');
  items.forEach((el) => {
    const isActive = el.getAttribute('data-route') === routeKey;
    if (isActive) {
      el.classList.add('active');
      el.setAttribute('aria-current', 'page');
    } else {
      el.classList.remove('active');
      el.removeAttribute('aria-current');
    }
  });
}

function renderRoute() {
  const hash = window.location.hash || '#/overview';
  const routeKey = hash.replace('#/', '') || 'overview';
  const route = routes[routeKey] || routes.overview;
  const app = document.getElementById('app');
  document.title = `${route.title} · 实验室`;
  app.innerHTML = route.render();
  setActiveNav(routeKey);

  if (routeKey === 'booking') {
    const form = document.getElementById('booking-form');
    const result = document.getElementById('booking-result');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const device = data.get('device');
        const date = data.get('date');
        const time = data.get('time');
        result.textContent = `已提交：${device} · ${date} ${time}`;
      });
    }
  }
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);


