import { environment } from 'src/environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input('photos') photos: Photo[];
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private auth: AuthService) {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.auth.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);

        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);
      }
    }
   }

  ngOnInit() {

  }

  fileOverBase(e:any): void {
    this.hasBaseDropZoneOver = e;
  }

}
