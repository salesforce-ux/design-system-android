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
ImageView icon = (ImageView) findViewById(R.id.taskIcon);
icon.setImageBitmap(Icons.getBitmap(this.getApplicationContext(),
Icons.ActionIcons.ActionNewTask, 150, Color.WHITE));

```


##### Custom Icons

```
ImageView icon = (ImageView) findViewById(R.id.custom1);
icon.setImageBitmap(Icons.getBitmap(this.getApplicationContext(),
Icons.CustomIcons.Custom1, 150, Color.WHITE));

```


##### Standard Icons

```
ImageView icon = (ImageView) findViewById(R.id.account);
icon.setImageBitmap(Icons.getBitmap(this.getApplicationContext(),
Icons.StandardIcons.Account, 150, Color.WHITE));

```


##### Utility Icons


```
ImageView icon = (ImageView) findViewById(R.id.addContact);
icon.setImageBitmap(Icons.getBitmap(this.getApplicationContext(),
Icons.Utility.AddContact, 150, Color.WHITE));

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
