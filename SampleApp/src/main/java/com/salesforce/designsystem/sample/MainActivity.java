package com.salesforce.designsystem.sample;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;

import com.salesforce.designsystem.Icons;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ImageView imageView1 = (ImageView) findViewById(R.id.imageView1);
        imageView1.setImageBitmap(Icons.getBitmap(this.getApplicationContext(), Icons.UtilityIcons.UtilityEmoji, 100, this.getApplicationContext().getResources().getColor(R.color.SLDS_COLOR_TEXT_BRAND)));

        ImageView imageView2 = (ImageView) findViewById(R.id.imageView2);
        imageView2.setImageBitmap(Icons.getBitmap(this.getApplicationContext(), Icons.UtilityIcons.UtilitySocialshare, 100));

        ImageView imageView3 = (ImageView) findViewById(R.id.imageView3);
        imageView3.setImageBitmap(Icons.getBitmap(this.getApplicationContext(), Icons.UtilityIcons.UtilityChevrondown, 100));

        ImageView imageView4 = (ImageView) findViewById(R.id.imageView4);
        imageView4.setImageBitmap(Icons.getBitmap(this.getApplicationContext(), Icons.UtilityIcons.UtilityDownload, 100, this.getApplicationContext().getResources().getColor(R.color.SLDS_COLOR_TEXT_WARNING)));

        ImageView imageView5 = (ImageView) findViewById(R.id.imageView5);
        imageView5.setImageBitmap(Icons.getBitmap(this.getApplicationContext(), Icons.UtilityIcons.UtilityFeed, 100));
    }
}
