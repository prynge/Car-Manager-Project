<template>
  <div class="container pt-5">
    <div class="row row-xs wd-xl-80p">
      <div class="col-sm-6 col-md-3 mg-t-10 mg-md-t-0"><button class="btn btn-success btn-with-icon btn-block" data-bs-toggle="modal" data-bs-target="#vehiculeModal"><i class="fas fa-plus-circle"></i> Ajouter un véhicule</button></div>
    </div><!-- row -->
    <vue-table-lite 
      :shas-checkbox="true"
      :is-loading="table.isLoading" 
      :is-re-search="table.isReSearch" 
      :columns="table.columns" 
      :rows="table.rows" 
      :total="table.totalRecordCount" 
      :sortable="table.sortable" 
      :messages="table.messages" 
      @do-search="doSearch" 
      @is-finished="tableLoadingFinish" 
      @return-checked-row="updateCheckedRows" 
    />

    <!-- Modal -->
    <div class="modal fade" id="vehiculeModal" tabindex="-1" aria-labelledby="vehiculeModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="vehiculeModalLabel">Ajouter un nouveau véhicule</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start" v-if="!submitted">
            <div class="form-group">
              <label for="serie">N° de série</label>
              <input type="text" id="serie" required="true" autofocus class="form-control" 
          v-model="vehicule.serie" name="serie" placeholder="Entrez le numéro de série du véhicule" />
            </div>
            <div class="form-group">
              <label>Marque</label>
              <select id="marque" class="form-select" v-model="vehicule.marque">
                  <option v-for="marque in marques" :key="marque.id" :value="marque.id">{{marque.nom}}</option>
              </select>
            </div><!-- form-group -->
          </div>
          <div v-else>
            <h4>Le véhicule a bien été créé!</h4>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success btn-with-icon btn-block" data-bs-toggle="modal" data-bs-target="#marqueModal"><i class="fas fa-plus-circle"></i> Ajouter une marque</button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="!submitted" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveVehicule">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal2 -->
    <div class="modal fade" id="marqueModal" tabindex="-1" aria-labelledby="marqueModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="marqueModalLabel">Ajouter une nouvelle marque</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start" v-if="!marqueSubmitted">
            <div class="form-group">
              <label for="marque">Marque</label>
              <input type="text" id="marque" required="true" autofocus class="form-control" 
          v-model="marque.nom"  placeholder="Entrez le nom de la marque" />
            </div>
          </div>
          <div v-else>
            <h4>La marque a bien été créée!</h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveMarque">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Modal --> 
    <div class="modal fade" id="modifierModal" tabindex="-1" aria-labelledby="modifierModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifierModalLabel">Modifier une véhicule</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="!editsubmitted" class="modal-body text-start">
            <div class="form-group">
              <label for="serie">N° de série</label>
              <input type="text" required="true" autofocus class="form-control" 
          v-model="currentVehicule.id" name="id" hidden placeholder="Entrez le numéro de série du véhicule" />
              <input type="text" required="true" autofocus class="form-control" 
          v-model="currentVehicule.serie" name="serie" placeholder="Entrez le numéro de série du véhicule" />
            </div>
            <div class="form-group">
              <label>Marque</label>
              <select id="marque" class="form-select" name="marque" v-model="currentVehicule.MarqueId">
                  <option v-for="marque in marques" :key="marque.id" :value="marque.id">{{marque.nom}}</option>
              </select>
            </div><!-- form-group -->
          </div>
          <div v-else>
            <h4>Le véhicule a bien été mis à jour!</h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteVehicule">Supprimer </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateVehicule">Enregistrer les modifications</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTableLite from 'vue3-table-lite';
import VehiculeService from "../../services/vehiculeService";
import MarqueService from "../../services/marqueService";


export default {
  name: 'Mon garage',
  components: {
    VueTableLite
  },
  data () {
    return {
      submitted:false,
      marqueSubmitted:false,
      editsubmitted:false,
      vehicule: {
        serie:'',
        marque:''
      },
      currentVehicule: {
        id:'',
        serie:'',
        MarqueId:''
      },
      marque: {
        nom:'',
      },
      marques: [],
      table:{
        isLoading: false,
        isReSearch: false,
        columns: [
          {
            label: "ID",
            field: "id",
            width: "3%",
            sortable: true,
            isKey: true,
          },
          {
            label: "N° de Série",
            field: "serie",
            width: "10%",
            sortable: true,
            display: function (row) {
              return (
                '<a href="#" data-id="' + row.user_id + '" class="is-rows-el name-btn">' + row.serie + "</button>"
              );
            },
          },
          {
            label: "Marque",
            field: "marque",
            width: "15%",
            sortable: true,
          },
          {
            label: "",
            field: "quick",
            width: "10%",
            display: function (row) {
              return (
                '<button type="button" data-id="' + row.user_id + '" class="btn btn-primary is-rows-el quick-btn" data-bs-toggle="modal" data-bs-target="#modifierModal" data-bs-whatever="' + row.id + '"><i class="fas fa-edit"></i>Modifier</button>'
              );
            },
          },
        ],
        rows: [
            
        ],
        totalRecordCount: 0,
        sortable: {
          order: "id",
          sort: "asc",
        },
        messages: {
          pagingInfo: "Showing {0}-{1} of {2}",
          pageSizeChangeLabel: "Row count:",
          gotoPageLabel: "Aller à la page:",
          noDataAvailable: "Aucune donnée",
        },
      },
    }
  },
  computed: {
    utilisateur() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    doSearch(){
      console.log("search")
    },
    tableLoadingFinish(){
      console.log("finished")
    },
    updateCheckedRows(){
      console.log("checkedrow")

    },

    // Methodes pour les véhicules
    saveVehicule() {
      let data = {
        serie: this.vehicule.serie,
        MarqueId: this.vehicule.marque,
        UtilisateurId: this.utilisateur.id
      };

      VehiculeService.create(data)
        .then(response => {
          this.vehicule.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.newVehicule();
          this.retrieveVehicules();
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveVehicules() {
      console.log("rrr");
      this.table.rows = []
      VehiculeService.getByUtilisateur(this.utilisateur.id)
        .then(response => {
          let rows = response.data;
          rows.forEach(element => {
            let marque;
            MarqueService.get(element.MarqueId)
            .then(response => {
              marque = response.data.nom;
            element.marque = marque
            this.table.rows.push(element);
            })
          });
          this.table.totalRecordCount = response.data.length;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteVehicule() {
      VehiculeService.delete(this.currentVehicule.id)
        .then(() => {
          console.log('del');
        })
        .catch(e => {
          console.log(e);
        });
        this.retrieveVehicules();
    },
    getOneVehicule(id){
      VehiculeService.get(id)
      .then(response => {
        console.log(response.data)
        this.currentVehicule = response.data;
      })
      .catch(e => {
        console.log(e);
      });
    },
    updateVehicule() {
      VehiculeService.update(this.currentVehicule.id, this.currentVehicule)
        .then(response => {
          console.log(response.data);
          this.message = 'Le véhicule à été mis à jour!';
          
          this.editsubmitted = true;
          this.retrieveVehicules();
          this.newVehicule();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newVehicule() {
      this.submitted = false;
      this.editsubmitted = false;
      this.currentVehicule = {};
    },

    // Methodes pour les marques
    saveMarque() {
      let data = {
        nom: this.marque.nom,
      };

      MarqueService.create(data)
        .then(response => {
          this.marque.id = response.data.id;
          console.log(response.data);
          this.marqueSubmitted = true;
          this.closeModal('marqueModal')
          this.newMarque()
          this.retrieveMarques()
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveMarques() {
      MarqueService.getAll()
        .then(response => {
          this.marques = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    getOneMarque(id){
      MarqueService.get(id)
      .then(response => {
        console.log(response.data)
        this.currentMarque = response.data;
        return response.data
      })
      .catch(e => {
        console.log(e);
      });
    },
    
    newMarque() {
      this.submitted = false;
      this.marque = {};
    },

    closeModal(id){
      let backdrops = document.querySelectorAll(".modal-backdrop")
      let modal = document.getElementById(id)
      let shouldSkip = false;
      backdrops.forEach(element => {
        if (shouldSkip) {
          return;
        }
        if (element.style.display != "none"){
          // element.style.display = "none"
          element.parentNode.removeChild(element);
          shouldSkip = true;
          return;
        }
      });
      modal.style.display = "none"
      modal.classList.remove("show")
      modal.hide()
      modal.setAttribute('aria-hidden', true)
      modal.removeAttribute('aria-modal')
      modal.removeAttribute('role')
      modal.trigger(`hidden${".bs.carousel"}`)
    }
  },
  mounted() {
    this.retrieveVehicules();
    this.retrieveMarques();
    let myModalEl = document.getElementById('modifierModal');
    (function(self){
      myModalEl.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        let button = event.relatedTarget
        // Extract info from data-bs-* attributes
        let recipient = button.getAttribute('data-bs-whatever')

        VehiculeService.get(recipient)
        .then(response => {
          console.log(response.data)
          self.currentVehicule = response.data;
        })
        .catch(e => {
          console.log(e);
        });
      })
    })(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
