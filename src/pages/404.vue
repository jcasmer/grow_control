<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Página No Encontrada<strong></strong></p>
    <q-btn
      color="secondary"
      style="width:400px;"
      @click="$router.push('/controlchilds/')"
    >Volver</q-btn>
  </div>
</template>
