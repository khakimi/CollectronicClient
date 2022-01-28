import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemService} from '../../service/item.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {UserCollectionService} from '../../service/userCollection.service';
import {Item} from '../../models/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  basicImage = "https://res.cloudinary.com/dykigxtqf/image/upload/v1643400745/import/emptyImage_tnoj05.jpg";
  addItemForm: FormGroup;
  selectedFile: File;
  isCreated = false;
  createdItem: Item;
  previewImgURL: any;

  constructor(private dialogRef: MatDialogRef<AddItemComponent>,
              private itemService: ItemService,
              private imageUploadService: ImageUploadService,
              private userCollectionService: UserCollectionService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.addItemForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      caption: ['', Validators.compose([Validators.required])],
      imageInput: ['', [Validators.required]],
    });
  }




  submit(): void {

    this.itemService.createItem({
      title: this.addItemForm.value.title,
      caption: this.addItemForm.value.caption
    }, this.data).subscribe(data => {
      this.createdItem = data;
      console.log(data);




      if (this.createdItem.id != null) {
        this.imageUploadService.uploadImageToItem(this.selectedFile,this.data,  this.createdItem.id)
          .subscribe(() => {
            this.notificationService.showSnackBar('Item was created successfully');
            this.isCreated = true;
            this.closeDialog();

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

  closeDialog() {
    this.dialogRef.close();
  }

}
