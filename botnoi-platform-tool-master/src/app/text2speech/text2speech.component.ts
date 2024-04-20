import { Component, OnInit, Renderer2, ElementRef, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditdialogComponent } from '../editdialog/editdialog.component';
import { DialogDownloadComponent } from '../dialog-download/dialog-download.component';
import { Router } from '@angular/router';
import { TextspeechService } from '../services/textspeech.service';


interface SelectionRectangle {
    left: number;
    top: number;
    width: number;
    height: number;
}

@Component({
    selector: 'app-text2speech',
    templateUrl: './text2speech.component.html',
    styleUrls: ['./text2speech.component.css'],
})
export class Text2speechComponent implements OnInit {

    public img = "../assets/img/playall.png";
    public selected = 'women';
    public coin = 0;
    public Volumevalue = 80;
    public editWord: Boolean;
    public textSelected = "";
    public textRange!: any;
    public speedValue: Number = 0;
    public voiceSpeaker: Number = 1;
    public x: number | undefined = 0;
    public y: number | undefined = 0;
    private _isOpen: boolean
    private _isOpenVolume: any;
    private selectedElememt: any;
    get isOpen() { return this._isOpen };
    get isOpenVolume() { return this._isOpenVolume }

    constructor(
        public dialog: MatDialog,
        private speechService: TextspeechService,
        private router: Router,
        private renderer: Renderer2,
        private el: ElementRef,
    ) {
        this.editWord = false;
        this._isOpen = false;
        this._isOpenVolume = false;
        // this.setCaret();
    }


    formatLabel(Volumevalue: number) {
        if (Volumevalue >= 1000) {
            return Math.round(Volumevalue / 1000) + '%';
        }
        return Volumevalue;
    }

    openVolume() {
        this._isOpenVolume = !this._isOpenVolume;
    }

    async playText(event: any) {

        console.log("play", this.textSelected)

        console.log(event);

        const text = this.textSelected;
        const voice = 1;

        this.speechService.playText(text,voice).subscribe(async (res) => {

            const context = new AudioContext();
            let file: any;

            file = await res.arrayBuffer();
            file = await context.decodeAudioData(file);

            const source = context.createBufferSource();
            source.buffer = file;
            source.connect(context.destination);
            source.start();
        });
    }

    playSoundTrack(event: any) {

        const el_track_play = event.srcElement.parentNode.parentNode.childNodes[1]
        const volume = el_track_play.getAttribute("volume")? el_track_play.getAttribute("volume") : this.Volumevalue;
        const speed = el_track_play.getAttribute("speed")? el_track_play.getAttribute("speed") : 1 ; 
        const voice = el_track_play.getAttribute("voice")? el_track_play.getAttribute("voice") : 1 ;

        const word_replace = el_track_play.getAttribute("replaceword");
        let text = event.srcElement.parentNode.parentNode.innerText;

        if(word_replace) {
            let array_word_replace = word_replace.split(',');
            array_word_replace.pop();

            array_word_replace.map((word: any) => {
                let replace = word.split(':');
                text = text.replace(replace[0].toString(), replace[1].toString());
            })
        }

        this.speechService.playText(text,voice).subscribe(async (res) => {

            console.log(res);

            const context = new AudioContext();
            let file: any = res;
            file = await res.arrayBuffer();
            file = await context.decodeAudioData(file);

            const gainNode = context.createGain();
            gainNode.gain.value = volume/100; // setting volume
            gainNode.connect(context.destination);

            const source = context.createBufferSource();
            source.buffer = file;
            source.connect(gainNode);
            source.playbackRate.value = speed; // setting speed
            source.start();

            console.log("playing... speed ",speed, " volume ",volume, " voice ",voice);

        });
    }

    changeVolume() {
        console.log(this.selectedElememt);
        if(this.selectedElememt) {
            this.selectedElememt.setAttribute("volume", this.Volumevalue);
        }
    }

    changeSpeed(event:any) {
        console.log(event.target.value);

        this.speedValue = event.target.value;

        if(this.selectedElememt) {
            this.selectedElememt.setAttribute("speed", this.speedValue);
        }
    }

    changeVoice(event:any) {
        console.log(event.target.value);

        this.voiceSpeaker = event.target.value;

        if(this.selectedElememt) {
            this.selectedElememt.setAttribute("voice", this.voiceSpeaker);
        }
    }

    pasteFromClipboard(e: any) {

        e.preventDefault();

        // get text representation of clipboard
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');

        // insert text manually
        document.execCommand("insertHTML", false, text);
    }


    openDialog() {
        const dialogRef = this.dialog.open(DialogDownloadComponent, {

        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result == true) {
                this.router.navigate(['/wallet'])
            }


        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
    }


    outside(e: any) {
        console.log("isOpen ", this.isOpen);

        const scope_area: NodeList = this.el.nativeElement.querySelectorAll(".textarea-input > span")
        // console.log(scope_area)

        let check = false;

        if (this.editWord) {
            scope_area.forEach((item, i) => {

                if (item.contains(e.target)) {
                    // Clicked in box
                    // console.log(i, " in box ");
                    check = true;
                }
            })

            // console.log("scope ", check);
            this._isOpen = check;
        }
    }

    selectText(event: Event): void {

        console.log("select text");
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        const position = selection?.getRangeAt(0).getBoundingClientRect();
        this.textRange = selection?.getRangeAt(0);

        console.log(position);

        this.editWord = false;

        if (text?.length) {
            this.textSelected = text
            // const x = event.pageX;
            // const y = event.pageY;
            //   this.x = x - 380;
            //   this.y = y - 205;
            // this.x = x - 600;
            const word_start = this.textRange.startOffset;
            const word_end = this.textRange.endOffset
            const word_length = word_end - word_start;

            this.x = Number(position?.left) - 350;
            this.y = Number(position?.top) - 160;

            this._isOpen = true;
        }
        else {
            this._isOpen = false;
        }
    };

    public openToolEdit(event: any): void {

        console.log(event);

        // console.log("edit tooltip");
        // console.log(event.srcElement);
        this.selectedElememt = event.srcElement;
        // this.selectedElememt = event.srcElement;

        this.x = Number(event?.clientX) - 550;
        this.y = Number(event?.clientY) - 180;
        this.editWord = true;
        this._isOpen = true;

    }

    public createSoundTrack() {

        const all_node = this.el.nativeElement.querySelectorAll(".textarea-input")[0]
        let target_node;
        console.log(all_node);

        //find node
        for (let i = 0; i < all_node.childNodes.length; i++) {

            const element = all_node.childNodes[i];

            if (element.textContent?.trim()?.includes(this.textRange.commonAncestorContainer.textContent?.trim())) {

                target_node = i;
                let str_1;
                let str_2;
                let str_3;

                const word_all = this.textRange.commonAncestorContainer.textContent?.length;
                const word_start = this.textRange.startOffset;
                const word_end = this.textRange.endOffset
                const word_length = word_end - word_start;

                // console.log("ข้อความเริ่มต้นที่ ", word_start, " สิ้นสุดที่ ",word_end ," ความยาว ", word_length ," อักษร");

                str_1 = element.textContent.slice(0, word_start).trim();
                str_2 = element.textContent.slice(word_start, word_end).trim();
                str_3 = element.textContent.slice(word_end, word_all).trim();

                // console.log("str 1 :", str_1);
                // console.log("str 2 :", str_2);
                // console.log("str 3 :", str_3);

                const el_target = this.renderer.createElement("span");
                el_target.style.backgroundColor = "white";
                el_target.style.height = "auto";
                el_target.style.padding = "1px 1px 1px 5px";
                el_target.style.margin = "5px";
                el_target.style.border = "1px solid #56b8f5";
                el_target.style.borderRadius = "5px";
                el_target.style.userSelect = "none";
                el_target.style.display = "flex";
                el_target.style.alignItems = "flex-start";
                el_target.style.alignContent = "center";
                el_target.className = "soundtrack";

                const play = this.renderer.createElement("span");
                play.innerHTML = '<img src="../../assets/img/play.png">';
                play.style.cursor = "pointer";
                this.renderer.listen(play, 'click', (event) => { this.playSoundTrack(event) })

                const downlod = this.renderer.createElement("span");
                downlod.innerHTML = '<img src="../../assets/img/download_small.png" style="width: 15px;" >';
                downlod.style.border = "1px solid rgba(1, 191, 251, 0.2)";
                downlod.style.backgroundColor = "#EFFBFE";
                downlod.style.borderRadius = "5px";
                downlod.style.padding = "1px 3px";
                downlod.style.height = "35px";
                downlod.style.width = "35px";
                downlod.style.margin = "1px";
                downlod.style.cursor = "pointer";
                downlod.style.display = "flex";
                downlod.style.flexDirection = "column";
                downlod.style.alignItems = "center";
                downlod.style.justifyContent = "center";
                this.renderer.listen(downlod, 'click', (event) => {
                    this.openToolEdit(event)
                })


                const close = this.renderer.createElement("span");
                close.innerHTML = '<img src="../../assets/img/close.png" style="width: 15px;" >';
                close.style.border = "1px solid rgba(1, 191, 251, 0.2)";
                close.style.backgroundColor = "#EFFBFE";
                close.style.borderRadius = "5px";
                close.style.padding = "1px 3px";
                close.style.height = "35px";
                close.style.width = "35px";
                close.style.margin = "1px"
                close.style.cursor = "pointer";
                close.style.display = "flex";
                close.style.flexDirection = "column";
                close.style.alignItems = "center";
                close.style.justifyContent = "center";

                this.renderer.listen(close, 'click', (event) => {
                    this.removeTrack(event)
                })


                const text = this.renderer.createElement("span");
                text.innerHTML = str_2;
                text.style.padding = "0px 5px";
                text.style.cursor = "pointer";

                this.renderer.listen(text, 'click', (event) => {
                    this.openToolEdit(event)
                })



                el_target.appendChild(play);
                el_target.appendChild(text);
                el_target.appendChild(downlod);
                el_target.appendChild(close);


                //remove old
                all_node.childNodes[i].remove();

                //**********add new node***********
                const el_prev = this.renderer.createElement("span");
                el_prev.innerHTML = str_1 + "&nbsp;";
                el_prev.contentEditable = true;
                el_prev.style.outline = "none";
                el_prev.spellcheck = false;
                this.renderer.listen(el_prev, 'mouseup', (event) => {
                    this.selectText(event)
                })

                const el_next = this.renderer.createElement("span");
                el_next.innerHTML = str_3 + "&nbsp;";
                el_next.contentEditable = true;
                el_next.style.outline = "none";
                el_next.spellcheck = false;
                this.renderer.listen(el_next, 'mouseup', (event) => {
                    this.selectText(event)
                })

                //มีข้อความอยู่ ทั้งด้านหน้า ด้านหลัง 
                all_node.insertBefore(el_prev, all_node.childNodes[target_node]);
                all_node.insertBefore(el_target, all_node.childNodes[target_node + 1]);
                all_node.insertBefore(el_next, all_node.childNodes[target_node + 2]);


                this._isOpen = false;

                break;
            }
            continue;
        }
    }

    openDialogEditWord() {

        console.log("dialog edit");
        this._isOpen = false;
        this.editWord = false;

        const dialogRef = this.dialog.open(EditdialogComponent);
        dialogRef.afterClosed().subscribe(result => {

            // console.log("result",result);
            // console.log("elememt edit ", this.selectedElememt)

            if (result) {
                this.highlightAndReplaceText(result);
            }

        });
    }

    public highlightAndReplaceText(wordArr: any): void {

        const all_node = this.el.nativeElement.querySelectorAll(".textarea-input")[0];

        const word_replace_arr = wordArr;
        let sentences = this.selectedElememt.parentNode.innerText.trim();

        for (let i = 0; i < all_node.childNodes.length; i++) {
            const node = all_node.childNodes[i];

            if (node.textContent?.trim() === sentences && node.className === "soundtrack") {

                let att_word_replace = "";

                for (let j = 0; j < word_replace_arr.length; j++) {

                    const word = word_replace_arr[j].write;
                    const word_read = word_replace_arr[j].read;
                    att_word_replace = att_word_replace + word + ":" + word_read + ",";

                    console.log(sentences);

                    const index = sentences.indexOf(word);

                    if (index >= 0) {
                        sentences = sentences.substring(0, index) + "<b style='color: #75DBCA;' data-read=" + word_read + ">" + sentences.substring(index, index + word.length) + "</b>" + sentences.substring(index + word.length, sentences.length);

                        console.log(sentences);
                    }
                }


                const span = this.renderer.createElement("span");

                span.innerHTML = sentences;
                span.style.cursor = "pointer"
                span.setAttribute("replaceword", att_word_replace);
                this.renderer.listen(span, 'click', (event) => {
                    this.openToolEdit(event);
                })

                node.childNodes[i].replaceWith(span);
                break;
            }

        }


        // //loop word want to replace
        // for (let i = 0; i < word_replace_arr.length; i++) {
        //     const word = word_replace_arr[i];

        //     //find in All node
        //     for (let j = 0; j < all_node.childNodes.length; j++) {

        //         const element = all_node.childNodes[j];

        //         if (element.textContent?.trim()?.includes(word.trim())) {

        //             // const text = this.textRange.commonAncestorContainer.textContent;
        //             const word_all = this.textRange.commonAncestorContainer.textContent?.length;
        //             const word_start = this.textRange.startOffset;
        //             const word_end = this.textRange.endOffset
        //             const word_length = word_end - word_start;

        //             // console.log("ข้อความเริ่มต้นที่ ", word_start, " สิ้นสุดที่ ",word_end ," ความยาว ", word_length ," อักษร");

        //             const str_1 = element.textContent.slice(0, word_start);
        //             const str_2 = element.textContent.slice(word_start, word_end);
        //             const str_3 = element.textContent.slice(word_end, word_all);

        //             const span = document.createElement("span");
        //             span.innerHTML = str_1 + "<b style='color:#75DBCA;'> " + str_2 + " </b>" + str_3;
        //             span.style.margin = "2px"

        //             element.childNodes[1].replaceWith(span);
        //         }
        //     }
        // }


    }

    public removeTrack(event: any): void {

        console.log("delete track");

        const all_node = this.el.nativeElement.querySelectorAll(".textarea-input")[0]
        const target_text = event.srcElement.parentNode.parentNode.innerText;

        // find node
        for (let i = 0; i < all_node.childNodes.length; i++) {

            const element = all_node.childNodes[i];

            if (element.textContent?.trim()?.includes(target_text)) {

                let targetnode = i;
                let str_prev = "";
                let str_next = "";

                //check node prev and next is span text ? 
                if (all_node.children[i - 1] && all_node.children[i + 1]) {

                    if (all_node.children[i - 1].className != "soundtrack" && all_node.children[i + 1].className != "soundtrack") {
                        console.log("มี element ด้านหน้า ด้านหลัง");

                        str_prev = String(all_node.children[i - 1].textContent);
                        str_next = String(all_node.children[i + 1].textContent);

                        all_node.childNodes[targetnode - 1].remove();
                        all_node.childNodes[targetnode - 1].remove();
                        all_node.childNodes[targetnode - 1].remove();

                        const span = this.renderer.createElement("span");
                        span.innerText = str_prev + " " + target_text + " " + str_next;
                        span.contentEditable = "true";
                        span.style.outline = "none";
                        span.spellcheck = false;
                        this.renderer.listen(span, 'mouseup', (event) => {
                            this.selectText(event)
                        })

                        all_node.insertBefore(span, all_node.childNodes[targetnode - 1]);
                        break;
                    }
                }

                if (all_node.children[i - 1]) {

                    if (all_node.children[i - 1].className != "soundtrack") {
                        console.log("มี element ด้านหน้า ");

                        str_prev = String(all_node.children[i - 1].textContent);

                        all_node.childNodes[targetnode - 1].remove();
                        all_node.childNodes[targetnode - 1].remove();

                        const span = this.renderer.createElement("span");
                        span.innerText = str_prev + " " + target_text;
                        span.contentEditable = "true";
                        span.style.outline = "none";
                        this.renderer.listen(span, 'mouseup', (event) => {
                            this.selectText(event)
                        })

                        all_node.insertBefore(span, all_node.childNodes[targetnode - 1]);
                        break;
                    }


                }

                if (all_node.children[i + 1]) {

                    if (all_node.children[i + 1].className != "soundtrack") {
                        console.log("มี element ด้านหลัง ");
                        str_next = String(all_node.children[i + 1].textContent);

                        all_node.childNodes[targetnode + 1].remove();
                        all_node.childNodes[targetnode].remove();

                        const span = this.renderer.createElement("span");
                        span.innerText = target_text + " " + str_next;
                        span.contentEditable = "true";
                        span.style.outline = "none";
                        this.renderer.listen(span, 'mouseup', (event) => {
                            this.selectText(event)
                        })

                        all_node.insertBefore(span, all_node.childNodes[targetnode]);
                        break;
                    }
                }
            }
            continue;
        }
    }

    ngOnInit() {

    }

}
