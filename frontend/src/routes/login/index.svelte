<script>
  import { goto, stores } from '@sapper/app';
  const { session } = stores();

  let password = "";
  let email = "";
  let error;

  const handleLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const parsed = await response.json();

    if (parsed.error) {
      error = parsed.error;
    } else {
      $session.token = parsed.token;
      const params = new URLSearchParams(window.location.search);
      await goto(params.has('redirect') ? params.get('redirect') : '/');
    }
  };
</script>
<h1>Login with your Strapi API credentials</h1>
<form on:submit|preventDefault="{handleLogin}" method="post">
  <label>
    Email:
    <input type="email" bind:value="{email}" />
  </label>
  <label>
    Password:
    <input type="password" bind:value="{password}" />
  </label>
  <button type="submit">Login</button>
</form>

{#if error}
  <p>{error}</p>
{/if}
