<template>
    <div class="container-fluid">
        <div class="row">
            <div :class="[navbarspace]">

            </div>
            <div :class="[contentspace]">
                <div class="row">
                    <div class="col-md-12">
                        <h1>kontakte</h1>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="btn-group">
                            <button class="btn btn-outline-success" @click="change_userlist_type('confirmed')">
                                Bestätigte Kontakte
                            </button>
                            <button class="btn btn-outline-danger" @click="change_userlist_type('unconfirmed')">
                                Nicht Bestätigte Kontakte
                            </button>

                        </div>
                    </div>


                </div>
                <div class="row">
                    <div class="col-12 ">
                        <table class="table table-hover">
                            <thead>

                                <tr>

                                    <th scope="col">#</th>
                                    <th scope="col">A</th>
                                    <th scope="col" @click="sort_users_str('personalinfo_firstname')">VN</th>
                                    <th scope="col" @click="sort_users_str('personalinfo_lastname')">LN</th>

                                    <th v-if="userlist_type == 'confirmed'" scope="col" @click="sort_users_num('age')">Age
                                    </th>
                                    <th v-if="userlist_type == 'confirmed'" scope="col"
                                        @click="sort_users_str('personalinfo_email')">Email</th>


                                    <th v-if="userlist_type == 'unconfirmed'" scope="col">Info</th>


                                </tr>
                            </thead>
                            <tbody>

                                <tr v-if="userlist_type == 'confirmed'" v-for="(user, index) in userlist.users">

                                    <th scope="row" @click="toggle_checkbox(index)">
                                        {{ index }}
                                    </th>
                                    <td>
                                        <input :id="`checkbox_${index}`" type="checkbox" v-model="user.selected"
                                            @click="toggle_checkbox_inputfield(index)">
                                    </td>

                                    <td>
                                        {{ user.personalinfo_firstname }}
                                    </td>
                                    <td>
                                        {{ user.personalinfo_lastname }}
                                    </td>
                                    <td>
                                        {{ calculate_age(user.personalinfo_birthdate) }}
                                    </td>
                                    <td :id="user.personalinfo_email">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                            class="bi bi-envelope" viewBox="0 0 16 16">
                                            <path
                                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                        </svg>
                                    </td>
                                </tr>


                                <tr v-else-if="userlist_type == 'unconfirmed'" v-for="(user, index) in userlist.users">

                                    <th scope="row" @click="toggle_checkbox(index)">
                                        {{ index }}
                                    </th>
                                    <td>
                                        <input :id="`checkbox_${index}`" type="checkbox" v-model="user.selected"
                                            @click="toggle_checkbox_inputfield(index)">
                                    </td>

                                    <td>
                                        {{ user.personalinfo_firstname }}
                                    </td>
                                    <td>
                                        {{ user.personalinfo_lastname }}
                                    </td>
                                    <td @click="open_info_modal(user._id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class=" blue bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
  <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
</svg>
                                    </td>


                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-9">
                        <pagination @change-page="change_userlist_page" :current_type="userlist_type" />
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div id="buttondiv" class="mini-button" :class="{hideme: checkHideme}"  style="color:green">
        <button @click="toggle_list_icon" data-bs-toggle="offcanvas" class="btn btn-success" type="button"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><svg
                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-check"
                viewBox="0 0 16 16">
                <path
                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path
                    d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
        </button>
    </div>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Deine ausgewählten Kontakte. Unten sind die
                möglichen Aktionen aufgelistet.</h5>
            <button @click="toggle_list_icon" type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">

            <a href="#" class="list-group-item list-group-item-action mt-3 list_item"
                v-for="sel_users in userlist.selected">
                <div :id="`listcontentdiv_${sel_users._id}`" class="selectedUser" @click="toggle_selected_user_state">
                    <div class="d-flex w-100 justify-content-between select_content_list_item">
                        <h5 class="mb-1">{{ sel_users.personalinfo_firstname }} {{ sel_users.personalinfo_lastname }},
                            {{
                                calculate_age(sel_users.personalinfo_birthdate) }} Jahre alt</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <div class="d-flex flex-column w-100 justify-content-end">
                        <p class="mb-1">Registriert für:</p>
                        <div class="d-flex">
                            <small class="text-muted" v-for="jobs in sel_users.registeredjobs">{{ jobs }} </small>
                        </div>
                    </div>
                </div>
                <div :id="`listdecisiondiv_${sel_users._id}`" class="d-flex justify-content-between not-active">
                    <div class="btn-group ">
                        <button :id="`editmodebtn_${sel_users._id}`" class="btn btn-outline-info decision-btn-start"
                            @click="toggle_selected_user_state">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fill-rule="evenodd"
                                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                        </button>
                        <button class="btn btn-danger decision_btn">Benutzer löschen</button>
                        <button class="btn btn-warning decision-btn-end">Von Auswahl entfernen</button>
                    </div>
                </div>
            </a>
        </div>

        <hr>
        <div class="btn-group  ">
            <button class="btn btn-outline-primary">Mail</button>
            <button @click="delete_users" class="btn btn-outline-primary">Löschen</button>
            <button @click="print_pdf" class="btn btn-outline-primary">PDF</button>
            <button data-bs-toggle="modal" data-bs-target="#createlist-modal" class="btn btn-outline-primary">Liste</button>
            <button class="btn btn-outline-primary" @click="confirm_users">Liste</button>
        </div>
        <hr>
    </div>
    <div class="modal" id="createlist-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eine Liste erstellen</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="listname" class="form-label">Bitte bennene die neue Liste</label>
                    <input type="text" placeholder="Köche Unter 25 Jahre..." class="form-control" id="listname"
                        v-model="listname_input">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                    <button @click="create_list" type="button" class="btn btn-primary" data-bs-dismiss="modal">Liste
                        erstellen</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="userinfo-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Infos zu User</h5>
                    <button type="button" class="btn-close" @click="close_userinfo_modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="currentUser_general">


                    <div class="generalinfo">
                        Info zu generalinfo
                        <div class="row justify-content-between" v-if="currentUser.clicked.komparse">
                            <div class="col-5">
                                <img :src="currentUser.clicked.komparse_pic1" style="max-width:225px; max-height:200px;">
                            </div>
                            <div class="col-5">
                                <img :src="currentUser.clicked.komparse_pic2" style="max-width:225px; max-height:200px;">
                            </div>
                        </div>
                        <div class="row justify-content-between" v-else>
                            <div class="col-10">
                                <img :src="currentUser.clicked.personalinfo_pic" style="max-width:450px; max-height:200px;">
                            </div>

                        </div>
                        <div class="row justify-content-between">
                            <div class="col-10">
                                <p class="infomodal"> Name: {{ currentUser.clicked.personalinfo_firstname }} {{
                                    currentUser.clicked.personalinfo_lastname }}</p>
                                <p class="infomodal">Geburtstag: {{
                                    calculate_age(currentUser.clicked.personalinfo_birthdate) }}</p>
                                <p class="infomodal"> Email: {{ currentUser.clicked.personalinfo_email }}</p>
                                <p class="infomodal"> Telefon: {{ currentUser.clicked.personalinfo_phonenumber }}</p>
                                <p class="infomodal"> Führerschein Status: {{
                                    currentUser.clicked.personalinfo_drivers_license }}</p>
                            </div>
                        </div>
                    </div>


                    <div v-if="currentuser_cook" class="cook">
                        <hr class="my-2">
                        Info zu KOCH
                    </div>
                    <div v-if="currentuser_komparse" class="komparse">
                        <hr class="my-2">
                        <div class="row justify-content-between">
                            <div class="col-10">
                                <p class="infomodal"> Körpergröße: {{ currentUser.clicked.komparse_body_size }}</p>
                                <p class="infomodal">Kleidergröße: {{ currentUser.clicked.komparse_cloth_size }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentuser_service" class="service">
                        <hr class="my-2">
                        Info zu SERVICE
                    </div>
                    <div v-if="currentuser_umsetzer" class="umsetzer">
                        <hr class="my-2">
                        <div class="row justify-content-between">
                            <div class="col-5">
                                <img :src="currentUser.clicked.umsetzer_driversLincense_front"
                                    style="max-width:225px; max-height:200px;">
                            </div>
                            <div class="col-5">
                                <img :src="currentUser.clicked.umsetzer_driversLincense_back"
                                    style="max-width:225px; max-height:200px;">
                            </div>
                        </div>
                        Info zu UMSETZER
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close_userinfo_modal">Schließen</button>
                    <button @click="confirm_user" type="button" class="btn btn-primary" data-bs-dismiss="modal">User
                        bestätigen
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

    

<script setup>
import { offset } from '@popperjs/core';
import pagination from '../pageparts/pagination.vue';
import { defineProps, ref, onMounted, reactive, defineEmits, inject,toRef } from 'vue'
// import { bootstrap } from 'bootstrap';
import { Modal } from 'bootstrap'
const props = defineProps(["navbar_space", "content_space","isMobil"]);
const emits = defineEmits(["print-pdf", "get-user-by-id", 'toggle-list-icon']);
let currentSort = ref("lastname");
let currentSortDir = ref("asc");
let isMobil = toRef(props, "isMobil");
console.log(isMobil);
let navbarspace = ref(props.navbar_space);

let contentspace = ref(props.content_space);
let userlist_type = ref("confirmed");
let listname_input = ref("");
let currentuser_cook = ref(false);
let currentuser_umsetzer = ref(false);
let currentuser_service = ref(false);
let currentuser_komparse = ref(false);
let currentUser_general = ref(false);

let checkHideme = ref(false);
let userlist = reactive({
    users: [],
    headers: [],
    selected: []
});
let currentUser = reactive({
    clicked: false,


});
let modals = reactive({
    userinfo: null,
});
onMounted(() => {
    fetch_users("1", "10");
    modals.userinfo = new Modal('#userinfo-modal', {});
    if(document.getElementById("sidebarMenu").classList.contains("show")){
        checkHideme.value= true;
    }
});

function print_pdf() {
    emits('print-pdf', userlist.selected);
}

async function fetch_users(page, limit) {
    fetch("http://localhost:5174/registration/get_registrations/" + page + "/" + limit + "/" + userlist_type.value, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            userlist.users = [];
            for (let i = 0; i < data.length; i++) {
                data[i].personalinfo_email = decodeURIComponent(data[i].personalinfo_email);
                userlist.users.push((data[i]));


            }
            console.log(userlist);

        })
        .catch(error => {
            console.error(error);
        });
}
function toggle_selected_user_state(event) {
    //element == a tag
    let id = event.currentTarget.id;
    console.log(event.currentTarget.id);
    //split id at _ 
    let id_arr = id.split("_");
    let user_id = id_arr[1];
    let decision_ele = document.getElementById("listdecisiondiv_" + user_id);
    let content_ele = document.getElementById("listcontentdiv_" + user_id);



    if (decision_ele.classList.contains("not-active")) {
        decision_ele.classList.remove("not-active");
        content_ele.classList.add("not-active");

    }
    else {
        decision_ele.classList.add("not-active");
        content_ele.classList.remove("not-active");
    }
    //split id on _#

}
function decode_Email(inputstring) {
    //find the @ in string
    let at_index = inputstring.indexOf("@");
    //if there is no @ in string, search for %40 instead and replace %40 with @
    if (at_index == -1) {
        inputstring = inputstring.replace("%40", "@");
        at_index = -2;
    }
    at_index = inputstring.indexOf("@");
    if (at_index == -1) {
        //find % in string and if at least the next to characters are numbers replace % and the numbers with one @
        let percent_index = inputstring.indexOf("%");
        if (percent_index != -1) {
            let NaN_index = 1;

            let next_char = inputstring.charAt(percent_index + NaN_index);
            while (!isNaN(next_char)) {
                NaN_index++;
                next_char = inputstring.charAt(percent_index + NaN_index);
                console.log("Nan_index: " + NaN_index);
            }

            //replace % and the numbers with one @
            inputstring = inputstring.replace(inputstring.substring(percent_index, percent_index + NaN_index), "@");


        }

    }

    return inputstring;
}
// methode schreiben, die unconfirmed zuerst zeigt.
// dann confirmed
//insgesamt aber nur limit viele. 
function calculate_age(birthdate) {
    let today = new Date();
    let birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
function toggle_checkbox(index) {
    console.log("toggle checkbox start");
    console.log(userlist.selected);
    if (document.getElementById("checkbox_" + index).checked) {
        document.getElementById("checkbox_" + index).checked = false;
        console.log("checked = t rue");
        userlist.selected.splice(userlist.selected.indexOf(userlist.users[index]), 1);


    }
    else {
        console.log("checked = false");
        document.getElementById("checkbox_" + index).checked = true;
        userlist.selected.push(userlist.users[index]);
        // console.log(userlist.selected);
    }
    console.log("toggle checkbox end");
    console.log(userlist.selected);

}
//unterschied: beide funktionen speichern die zugehörige value in das sidebar array.
//aber benutzt man die obere funktion für die checkboxen werden die wieder autoamtisch auf false gesetzt. 
//wird eine checkbox gechecked, wird .checked == true  --- bei der funktion wird aber dann geprüft ob diese checked ist.
function toggle_checkbox_inputfield(index) {
    console.log("toggle checkbox inputfield start");
    console.log(userlist.selected);
    if (document.getElementById("checkbox_" + index).checked) {
        userlist.selected.push(userlist.users[index]);
    }
    else {
        userlist.selected.splice(userlist.selected.indexOf(userlist.users[index]), 1);
    }
    console.log("toggle checkbox inputfield end");
    console.log(userlist.selected);
}





function sort_users_str(sortby) {
    if (sortby == currentSort.value) {
        if (currentSortDir.value == "asc") {
            currentSortDir.value = "desc";
        }
        else {
            currentSortDir.value = "asc";
        }

    }
    else {
        if (currentSortDir.value == "desc") {
            currentSortDir.value = "asc";
        }
        else {
            currentSortDir.value = "desc";
        }
    }
    currentSort.value = sortby;

    if (currentSortDir.value == "asc") {
        userlist.users.sort((a, b) => {
            if (a[sortby].toLowerCase() < b[sortby].toLowerCase()) {
                return -1;
            }
            if (a[sortby].toLowerCase() > b[sortby].toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }
    else {
        userlist.users.sort((a, b) => {
            if (a[sortby].toLowerCase() > b[sortby].toLowerCase()) {
                return -1;
            }
            if (a[sortby].toLowerCase() < b[sortby].toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }

}

function sort_users_num(sortby) {
    if (sortby == currentSort.value) {
        if (currentSortDir.value == "asc") {
            currentSortDir.value = "desc";
        }
        else {
            currentSortDir.value = "asc";
        }

    }
    else {
        if (currentSortDir.value == "desc") {
            currentSortDir.value = "asc";
        }
        else {
            currentSortDir.value = "desc";
        }
    }
    currentSort.value = sortby;
    if (sortby == "age") {
        userlist.users.sort(compare_users);
    }

}
function compare_users(a, b) {
    if (currentSortDir.value == "desc") {
        return b - a;
    }
    else {
        return a - b;

    }
}
function change_userlist_page(page, limit) {
    fetch_users(page, limit);

}
function change_userlist_type(newvalue) {
    // location.reload();


    userlist_type.value = newvalue;
    fetch_users("1", "10");
    userlist.selected = [];
}
function create_list() {
    let tmp_arr = [];
    let listname = listname_input.value;
    console.log(userlist.selected);
    for (let i = 0; i < userlist.selected.length; i++) {
        tmp_arr.push(userlist.selected[i]._id);
    }
    fetch("http://localhost:5174/userlist/", {
        method: "POST",
        headers: { users: JSON.stringify(tmp_arr), listname: listname }
    })
        .then(response => response.json())
        .then(data => {


        })
        .catch(error => {
            console.error(error);
        });
}
async function open_info_modal(userid) {
    try {
        console.log('moin');
        currentUser_general.value = true;
        let user = await fetch_user_by_id(userid);
        currentUser.clicked = user;
        //get the modal userinfo-modal and open it 

        console.log(user);
        if (user.komparse) {
            currentuser_komparse.value = true;
        }
        if (user.umsetzer) {
            currentuser_umsetzer.value = true;
        }
        if (user.cook) {
            currentuser_cook.value = true;
        }
        if (user.service) {
            currentuser_service.value = true;
        }
        modals.userinfo.show();
        console.log(currentUser.clicked);
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
}
async function fetch_user_by_id(id) {
    try {
        let response = await fetch("http://localhost:5174/registration/get/" + id, {
            method: "GET",
            //headers: {limit : limit.value , page : page.value}
        });
        if (response.ok) {
            let data = await response.json();
            return data; // Return the fetched data
        }
        else {
            throw new Error('Failed to fetch user data');
        }
    }
    catch (error) {
        console.error(error);
        // Handle the error appropriately

    }

}
function close_userinfo_modal() {

    currentuser_komparse.value = false;
    currentuser_umsetzer.value = false;
    currentuser_cook.value = false;
    currentuser_service.value = false;
    modals.userinfo.hide();
    currentUser_general.value = false;
}
function confirm_user() {
    let id = currentUser.clicked._id;
    try {
        let response = fetch("http://localhost:5174/registration/confirm/" + id, {
            method: "PUT",
            //headers: {limit : limit.value , page : page.value}
        });


    }
    catch (error) {
        console.error(error);
        // Handle the error appropriately

    }
}
function confirm_users() {
    //get all divs with the class = "selectedUser" 
    let selectedUsers = document.getElementsByClassName("selectedUser");
    //loop through all of them and concat the id in a string id1,id2,id3
    let ids = "";
    for (let i = 0; i < selectedUsers.length; i++) {
        //before adding the id remove the front part of id which is _ 
        ids += selectedUsers[i].id.split("_")[1] + ",";

    }
    //remove the last comma
    ids = ids.substring(0, ids.length - 1);
    try {
        let response = fetch("http://localhost:5174/registration/confirm/" + ids, {
            method: "PUT",
            //headers: {limit : limit.value , page : page.value}
        });


    }
    catch (error) {
        console.error(error);
        // Handle the error appropriately

    }
}

function delete_users() {
    let selectedUsers = document.getElementsByClassName("selectedUser");
    //loop through all of them and concat the id in a string id1,id2,id3
    let ids = "";
    for (let i = 0; i < selectedUsers.length; i++) {
        //before adding the id remove the front part of id which is _ 
        ids += selectedUsers[i].id.split("_")[1] + ",";

    }
    //remove the last comma
    ids = ids.substring(0, ids.length - 1);
    try {
        let response = fetch("http://localhost:5174/registration/delete/" + ids, {
            method: "DELETE",
            //headers: {limit : limit.value , page : page.value}
        });


    }
    catch (error) {
        console.error(error);
        // Handle the error appropriately

    }
}
function toggle_list_icon() {
    emits('toggle-list-icon');
}
function checkIfCanvasOpen() {

    if (document.getElementById("offcanvas_navbar").classList.contains == "show") {
        return false;
    }
    else {
        return true;
    }
}
</script>