# Lightning Design System tokens, icons and fonts for Android

XML configuration and java files for [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/) [Tokens](https://www.lightningdesignsystem.com/design-tokens/).

Current release: Spring ’17

## Simple Install


## Sample Application 

See [Demo App](https://github.com/salesforce-ux/design-system-android/tree/master/????)

### Examples


#### Colors

```
android:background="@color/slds_color_brand_dark"

```


#### Fonts and text sizes

```
app:custom_font="SalesforceSans-Regular.ttf"

```


#### Icons

##### Action Icons

```
Icons.getDrawable(resources,
                  Icons.ActionIcons.ActionNewTask,
                  resources.getDimensionPixelSize(R.dimen.slds_square_icon_medium),
                  resources.getColor(R.color.slds_color_text_link));        
```


##### Custom Icons

```
Icons.getDrawable(resources,
                  Icons.CustomIcons.Custom1,
                  resources.getDimensionPixelSize(R.dimen.slds_square_icon_medium),
                  resources.getColor(R.color.slds_color_text_link));  
```


##### Standard Icons

```
Icons.getDrawable(resources,
                  Icons.StandardIcons.Account,
                  resources.getDimensionPixelSize(R.dimen.slds_square_icon_medium),
                  resources.getColor(R.color.slds_color_text_link));

```


##### Utility Icons


```
Icons.getDrawable(resources,
                  Icons.Utility.AddContact,
                  resources.getDimensionPixelSize(R.dimen.slds_square_icon_medium),
                  resources.getColor(R.color.slds_color_text_link));


```

## Library Build (not required)

```
$ npm install
$ gulp
```

## Licenses

* Source code is licensed under [BSD 3-Clause](https://git.io/sfdc-license)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce-ux/licenses/blob/master/LICENSE-icons-images.txt)
* The Salesforce Sans font is licensed under our [font license](https://github.com/salesforce-ux/licenses/blob/master/LICENSE-font.txt)
