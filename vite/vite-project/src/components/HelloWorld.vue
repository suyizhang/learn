<template>
  <h1>{{ msg }}</h1>

  <p>
  <button type="button" @click="count++">count is: {{ count }}</button>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div>
    <input type="text" :value="name" @change="setName">
    <div>{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: (props) => {
  console.log('setup :>> ', 'setup');
   const propsData = toRefs(props);
   console.log(propsData);
    const count = ref(0)
    return { count, name: 'jump' }
  },

  data() {
    console.log('data :>> ', 'data');
    return {
      name: 'suyi',
    }
  },

  beforeCreate() {
    console.log('beforeCreate :>> ', 'beforeCreate');
  },

  created() {
    console.log('created :>> ', 'created');
  },

  beforeMount() {
    console.log('beforeMount :>> ', 'beforeMount');
  },

  mounted() {
    console.log('mounted :>> ', 'mounted');
  },

  methods: {
    setName(event: { target: { value: string; }; }) {
      this.$data.name = event.target.value;
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
