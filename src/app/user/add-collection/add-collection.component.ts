import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageUploadService} from '../../service/image-upload.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';
import {UserCollection} from '../../models/UserCollection';
import {UserCollectionService} from '../../service/userCollection.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  basicImage = 'https://res.cloudinary.com/dykigxtqf/image/upload/v1643400745/import/emptyImage_tnoj05.jpg';
  collectionForm: FormGroup;
  selectedFile: File;
  isCollectionCreated = false;
  createdCollection: UserCollection;
  previewImgURL: any;

  constructor(private userCollectionService: UserCollectionService,
              private imageUploadService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.collectionForm = this.createCollectionForm();
  }

  createCollectionForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {

    this.userCollectionService.createCollection({
      title: this.collectionForm.value.title,
      description: this.collectionForm.value.description,
    }).subscribe(data => {
      this.createdCollection = data;
      console.log(data);

      if (this.createdCollection.id != null) {
        this.imageUploadService.uploadImageToCollection(this.selectedFile, this.createdCollection.id)
          .subscribe(() => {
            this.notificationService.showSnackBar('Collection created successfully');
            this.isCollectionCreated = true;
            this.router.navigate(['/profile']);

          });
      }
    });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }

}
