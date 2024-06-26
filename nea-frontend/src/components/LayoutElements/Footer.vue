<script>
</script>

<template>
  <footer class="footer">
    <div class="footer_list">
      <p class="small-header">Новосибирская Экологическая Академия:</p>
      <a class="plain-text" href="/about">О нас</a>
      <a class="plain-text" href="/news">Новости</a>
      <a class="plain-text" href="/projects">Проекты</a>
      <a class="plain-text" href="/nca">АНО "НИСИ"</a>
      <a class="plain-text" href="/contact">Сотрудничество</a>
    </div>

    <div class="footer_contact">
      <p class="small-header">Сотрудничество:</p>
      <div class="footer_block">
        <div class="small-header">Email:</div>
        <p class="plain-text">nsk.ecoacademy@gmail.com</p>
      </div>
      <div class="footer_block">
        <div class="small-header">Адрес:</div>
        <p class="plain-text">Новосибирская область, Новосибирский р-н, рп Краснообск, ул. Восточная, зд. 22/7, помещ. 8</p>
      </div>
    </div>
  </footer>
</template>


<style lang="scss">
@import "@/assets/styles/main";
.footer {
  color: $text-main;
  background-color: $secondary2;
  padding: 2rem 5rem;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;

  &_list {
    display: flex;
    flex-direction: column;
  }

  &_block {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  &_contact {
    display: flex;
    flex-direction: column;
    text-align: right;
    width: 25%;
  }
}

@media (max-width: 992px) {
  .footer {
    flex-direction: column;

    &_block {
      justify-content: flex-start;
    }

    &_contact {
      padding-top: 1rem;
      width: 100%;
      text-align: left;
      gap: 5px;
    }
  }
}

</style>