/**
 * This object handles loading the file from the phanku.kicks-ass.org server into the AL server.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

const remote_baseURL = "https://some.server.com/scripts/assets/directory";
const remote_files = [
    {
        slot: 1,
        name: 'Mage',
        file: 'dist/Mage.js'
    }
];

const remote_keyHandler = (e) => {
    switch(e.keyCode) {
        case 120: // F9
            remote_pullCode();
            e.preventDefault();
            break;

        case 121:

            e.preventDefault();
            break;
    }
};

parent.addEventListener('keydown', remote_keyHandler, false);

function remote_pullCode() {
    parent.api_call("list_codes", {
        callback: function () {
            let ran =  Math.floor(Math.random() * Math.floor(10000));
            game_log('Updating files from remote server.');
            for (let file of remote_files) {
                let request = new XMLHttpRequest();
                request.open("GET", remote_baseURL + file.file + '?t=' + ran);
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let data = {
                            name: file.name,
                            slot: file.slot,
                            code: request.responseText
                        };
                        parent.api_call("save_code", data);
                        game_log("Saved to slot [" + file.name + "] as " + file.slot);
                    }
                };
                request.send();
            }
        }
    });
}