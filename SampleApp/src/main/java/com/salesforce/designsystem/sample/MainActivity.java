package com.salesforce.designsystem.sample;

import com.salesforce.designsystem.Icons;

import android.content.res.Resources;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageView imageView;
        Resources res = this.getApplicationContext().getResources();

        // Action icons
        imageView = (ImageView) findViewById(R.id.imageAction1);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.ActionIcons.ActionAddContact,
                                                 100,
                                                 res.getColor(R.color.slds_color_text_brand)));

        imageView = (ImageView) findViewById(R.id.imageAction2);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.ActionIcons.ActionJoinGroup,
                                                 100));

        imageView = (ImageView) findViewById(R.id.imageAction3);
        imageView
                .setImageBitmap(Icons.getBitmap(res,
                                                Icons.ActionIcons.ActionNewAccount,
                                                100));

        imageView = (ImageView) findViewById(R.id.imageAction4);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.ActionIcons.ActionDelete,
                                                 100,
                                                 res.getColor(R.color.slds_color_text_error)));

        imageView = (ImageView) findViewById(R.id.imageAction5);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.ActionIcons.ActionNewTask,
                                                 100));


        // Utility icons
        imageView = (ImageView) findViewById(R.id.imageUtility1);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.UtilityIcons.UtilityEmoji,
                                                 100,
                                                 res.getColor(R.color.slds_color_text_brand)));

        imageView = (ImageView) findViewById(R.id.imageUtility2);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.UtilityIcons.UtilitySocialshare,
                                                 100));

        imageView = (ImageView) findViewById(R.id.imageUtility3);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.UtilityIcons.UtilityChevrondown,
                                                 100));

        imageView = (ImageView) findViewById(R.id.imageUtility4);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.UtilityIcons.UtilityDownload,
                                                 100,
                                                 res.getColor(R.color.slds_color_text_warning)));

        imageView = (ImageView) findViewById(R.id.imageUtility5);
        imageView.setImageBitmap(Icons.getBitmap(res,
                                                 Icons.UtilityIcons.UtilityFeed,
                                                 100));
    }
}
