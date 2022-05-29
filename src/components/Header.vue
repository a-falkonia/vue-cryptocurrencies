<template>
  <header class="navbar sticky-top navbar-light navbar-expand-lg navigation-clean">
    <div class="container">
      <h1>
        <router-link class="navbar-brand" to="/dashboard" title="Crypto Converter">Crypto Converter</router-link>
      </h1>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/a-falkonia" target="_blank" rel="noopener noreferrer">About</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard" title = "Dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/my-portfolio" title = "My Portfolio">My Portfolio</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
  }
}
</script>
