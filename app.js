// Language Class
class Language {
    constructor(name, platform, whatYouCanDo, icon) {
        this.langId = Math.floor(Math.random() * 10000);
        this.name = name;
        this.platform = platform;
        this.whatYouCanDo = whatYouCanDo;
        this.icon = icon;
    }
}

// UI Class
class UI {

    addLanguageToList(language) {
        const list = document.getElementById("language-list");

        var html = `
            <tr>
                <td><img src="img/${language.icon}"/></td>
                <td>${language.name}</td>
                <td>${language.platform}</td>
                <td>${language.whatYouCanDo}</td>
                <td><a href="#" data-id="${language.langId}" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;

        list.innerHTML += html;
    }

    clearControls() {
        const name = document.getElementById("name").value = "";
        const platforms = document.getElementById("platform").value = "";
        const whatYouCanDo = document.getElementById("whatyoucando").value = "";
        const icon = document.getElementById("icon").value = "";
    }

    deleteLanguage(element) {

        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
            return true;
        }

    }

    showAlert(message, className) {
        var alert = `
            <div class="alert alert-${className}">
            ${message}
            </div>
        `;

        const row = document.querySelector(".row");
        row.insertAdjacentHTML("beforeBegin", alert);
    }

}

// Storage Class
class Storage {

    static getLanguages() {
        let languages;

        if (localStorage.getItem("languages") === null) {
            languages = [];
        } else {
            languages = JSON.parse(localStorage.getItem("languages"));
        }
        return languages;
    }

    static displayLanguages() {
        const languages = Storage.getLanguages();
        
        languages.forEach(language => {
            const ui = new UI();
            ui.addLanguageToList(language);
        });

    }

    static addLanguage(element) {
        const languages = Storage.getLanguages();
        languages.push(element);
        localStorage.setItem("languages", JSON.stringify(languages));
    }

    static deleteLanguage(element) {

        if (element.classList.contains("delete")) {
            const id = element.getAttribute("data-id");

            const languages = Storage.getLanguages();
            languages.forEach((language, index) => {
                if (language.langId = id) {
                    languages.splice(index, 1);
                }
            });

            localStorage.setItem("languages", JSON.stringify(languages));
        }

    }

}

document.addEventListener("DOMContentLoaded", Storage.displayLanguages);

document.getElementById("new-language").addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const platforms = document.getElementById("platform").value;
    const whatYouCanDo = document.getElementById("whatyoucando").value;
    const icon = document.getElementById("icon").value;

    //create language object
    const lang = new Language(name, platforms, whatYouCanDo, icon);

    //create UI
    const ui = new UI();

    if (name === "" || platforms === "" || whatYouCanDo === "" || icon === "") {
        ui.showAlert("Please complete the form!", "warning");
    } else {

        //add language to list
        ui.addLanguageToList(lang);

        //save to local storage
        Storage.addLanguage(lang);

        //clear controls
        ui.clearControls();

        //show on the UI
        ui.showAlert("The language has been added!", "success")
    }

    e.preventDefault();
});

document.getElementById("language-list").addEventListener("click", function (e) {
    const ui = new UI();

    //delete language + delete from local storage

    if (ui.deleteLanguage(e.target) == true) {
        Storage.deleteLanguage(e.target);
        ui.showAlert("The language has been deleted!", "danger");
    }

});