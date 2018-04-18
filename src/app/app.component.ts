/**
 * File: /Users/michaelbeeson/Documents/VSCode/angular-001/ng-animations/src/app/app.component.ts
 */

import { Component } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)"
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)"
        })
      ),
      transition("normal <=> highlighted", animate(300)) //<=>
      // transition('highlighted => normal', animate(800))
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0) scale(1)"
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px) scale(1)"
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          transform: "translateX(0) scale(0.5)"
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({
          "background-color": "orange"
        }),
        animate(
          1000,
          style({
            borderRadius: "50px"
          })
        ),
        animate(500)
      ])
    ]),
    trigger("list1", [
      state(
        "in",
        style({
          // Off screen state start
          opacity: 1, // fully visible
          transform: "translateX(0)"
        })
      ),
      transition("void => *", [
        style({
          opacity: 1, // invisible
          transform: "translateX(-100px)"
        }),
        animate(300)
      ]),
      transition("* => void", [
        // Deleted state complete
        animate(
          300,
          style({
            transform: "translateX(100px)",
            opacity: 0
          })
        )
      ])
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0 // at 0% of transition time
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3 // after 30% of transition time
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8 // after 80% of transition time
            }),
            style({
              transform: "translateX(0px)",
              opacity: 1,
              offset: 1 // at 100% of transition time
            })
          ])
        )
      ]),
      transition("* => void", [
        group([
          // group does the following starting at same time
          animate(
            300,
            style({
              // take 300 to turn red
              color: "red"
            })
          ),
          animate(
            800,
            style({
              // take 800 to move 100px and disappear
              transform: "translateX(100px)",
              opacity: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAnimate() {
    this.state == "normal"
      ? (this.state = "highlighted")
      : (this.state = "normal");
    this.wildState == "normal"
      ? (this.wildState = "highlighted")
      : (this.wildState = "normal");
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event) {
    // animation call back
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }
}
