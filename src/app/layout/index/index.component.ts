import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../service/user.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {Item} from '../../models/Item';
import {ItemService} from '../../service/item.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLoaded = false;
  items: Item[];
  isUserDataLoaded = false;
  user: User;

  constructor(private itemService: ItemService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageUploadService
  ) { }

  ngOnInit(): void {
    this.itemService.getAllItems()
      .subscribe(data => {
        console.log(data);
        this.items = data;
        this.getImagesToItems(this.items);
        this.getCommentsToItem(this.items);
        this.isLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  getImagesToItems(items: Item[]): void {
    items.forEach(p => {
      this.imageService.getImageToItem(p.id)
        .subscribe(data => {
          p.image = data.url;
        })
    });
  }

  getCommentsToItem(items: Item[]): void {
    items.forEach(p => {
      this.commentService.getCommentsToItem(p.id)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likeItem(itemId: number, itemIndex: number): void {
    const  item = this.items[itemIndex];
    if (!item.usersLiked.includes(this.user.username)) {
      this.itemService.likeItem(itemId, this.user.username)
        .subscribe(() => {
          item.usersLiked.push(this.user.username);
          item.likes++;
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.itemService.likeItem(itemId, this.user.username)
        .subscribe(() => {
          const index = item.usersLiked.indexOf(this.user.username, 0);
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



}
