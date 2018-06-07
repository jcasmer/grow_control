<template>
  <q-page padding>
    <div class="container">
      <childs-component ref="childsComponent">
      </childs-component>
      <hr>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.relationship" :options="selectRelationshipOptions" separator float-label="Parentesco"/>
        <div class="lbl-error" v-if="errorsParents.relationship != 0 && errorsParents.relationship != null">
            {{ errorsParents.relationship[0] }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ChildsComponent from 'components/People/Childs.vue'
export default {
  name: 'Childs',
  components: {
    ChildsComponent
  },
  data () {
    return {
      parentsfields: {
        document: null,
        relationship: null
      },
      errorsParents: {
        document: null,
        relationship: null
      },
      selectRelationshipOptions: []
    }
  },
  methods: {
    getRelationship () {
      let parameters = {
        nopaginate: 'nopaginate',
        is_active: 'True',
        ordering: 'name'
      }
      this.$axios.get('/relationship/', {
        params: parameters
      }).then(response => {
        let values = response.data
        this.selectRelationshipOptions.push({value: null, label: ''})
        for (var data in values) {
          this.selectRelationshipOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>

<style>
</style>
