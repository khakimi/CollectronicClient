import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserCollection} from '../../models/UserCollection';
import {UserCollectionService} from '../../service/userCollection.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {ItemService} from '../../service/item.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {Item} from '../../models/Item';
import {AddItemComponent} from '../add-item/add-item.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';

@Component({
  selector: 'app-item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  isLoaded = false;
  items: Item [];
  collection: UserCollection

  constructor(private imageService: ImageUploadService,
              private itemService: ItemService,
              private collectionService: UserCollectionService,
              private dialog: MatDialog,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private rt: Router)
  {

  }



  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.collectionService.getCollectionById(id).subscribe(data=>{
      this.collection = data;
      this.imageService.getImageToCollection(id).subscribe(
        data =>{
          this.collection.image = data.url
        }
      )
    })

    this.itemService.getAllItemsToCollection(id)
      .subscribe(data => {
        console.log(data);
        this.items = data;
        this.getImagesToItems(this.items);
        this.getCommentsToItems(this.items);
        this.isLoaded = true;
      });
  }

  getImagesToItems(items: Item[]): void {
    items.forEach(c => {
      this.imageService.getImageToItem(c.id)
        .subscribe(data => {
          c.image = data.url;
        });
    });
  }


  getCommentsToItems(items: Item[]): void {
    items.forEach(i => {
      this.commentService.getCommentsToItem(i.id)
        .subscribe(data => {
          i.comments = data;
        });
    });
  }

  removeItem(item: Item, index: number): void {
    console.log(item);
    const result = confirm('Do you really want to delete this item?');
    if (result) {
      this.itemService.deleteItem(item.id)
        .subscribe(() => {
          this.items.splice(index, 1);
          this.notificationService.showSnackBar('Item deleted');
        });
    }
  }

  openAddItemDialog(): void {
    const dialogAddItem = new MatDialogConfig();
    dialogAddItem.width = '70%';
    dialogAddItem.data = this.collection.id;
    this.dialog.open(AddItemComponent, dialogAddItem);
  }

  likeItem(itemId: number, itemIndex: number): void {
    const  item = this.items[itemIndex];
    if (!item.usersLiked.includes(this.collection.username)) {
      this.itemService.likeItem(itemId, this.collection.username)
        .subscribe(() => {
          item.usersLiked.push(this.collection.username);
          item.likes++;
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.itemService.likeItem(itemId, this.collection.username)
        .subscribe(() => {
          const index = item.usersLiked.indexOf(this.collection.username, 0);
          if (index > -1) {
            item.usersLiked.splice(index, 1);
          }
        });
      item.likes--;
    }
  }



  postComment(message: string, itemId: number, itemIndex: number): void {
    const item = this.items[itemIndex];

    console.log(item);
    this.commentService.addToCommentToItem(itemId, message)
      .subscribe(data => {
        console.log(data);
        item.comments.push(data);
      });
  }


  deleteComment(commentId: number, itemIndex: number, commentIndex: number): void {
    const item = this.items[itemIndex];

    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        this.notificationService.showSnackBar('Comment removed');
        item.comments.splice(commentIndex, 1);
      });
  }



}
