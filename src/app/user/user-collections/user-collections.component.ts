import {Component, OnInit} from '@angular/core';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {UserCollectionService} from '../../service/userCollection.service';
import {UserCollection} from '../../models/UserCollection';
import {ItemService} from '../../service/item.service';
import {Item} from '../../models/Item';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {AddItemComponent} from '../add-item/add-item.component';
import {ItemsComponent} from '../items/items.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-collections.component.html',
  styleUrls: ['./user-collections.component.css']
})
export class UserCollectionsComponent implements OnInit {


  isLoaded = false;
  collections: UserCollection [];
  display = false;
  items: Item[]

  constructor(private collectionService: UserCollectionService,
              private imageService: ImageUploadService,
              private itemService: ItemService,
              private dialog: MatDialog,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.collectionService.getCollectionsForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.collections = data;
        this.getImagesToPosts(this.collections);
        this.getItemsToCollections(this.collections);

        this.isLoaded = true;
      });
  }

  getItemsNumber(index: number): number{
    this.items = this.collections[index].items;
    if(this.items != null)
      return this.items.length;
    else
      return 0;
  }

  getImagesToPosts(collections: UserCollection[]): void {
    collections.forEach(c => {
      this.imageService.getImageToCollection(c.id)
        .subscribe(data => {
          c.image = data.url;
        });
    });
  }


  getItemsToCollections(collections: UserCollection[]): void {
    collections.forEach(c => {
      this.itemService.getAllItemsToCollection(c.id)
        .subscribe(data => {
          c.items = data;
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

  removeCollection(collection: UserCollection, index: number): void {
    console.log(collection);
    const result = confirm('Do you really want to delete this post?');
    if (result) {
      this.collectionService.deleteCollection(collection.id)
        .subscribe(() => {
          this.collections.splice(index, 1);
          this.notificationService.showSnackBar('Collection deleted');
        });
    }
  }


  openAddItemDialog(index: number): void {
    const dialogAddItem = new MatDialogConfig();
    dialogAddItem.width = '70%';
    dialogAddItem.data = this.collections[index].id;
    this.dialog.open(AddItemComponent, dialogAddItem);
  }

  onItem(){

    this.display? this.display=false: this.display=true;
}



  // deleteComment(commentId: number, itemIndex: number, commentIndex: number): void {
  //   const item = this.items[itemIndex];
  //
  //   this.commentService.deleteComment(commentId)
  //     .subscribe(() => {
  //       this.notificationService.showSnackBar('Comment removed');
  //       item.comments.splice(commentIndex, 1);
  //     });
  // }

}
