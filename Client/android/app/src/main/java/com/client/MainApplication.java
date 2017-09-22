 import com.reactnativenavigation.NavigationApplication;

 import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
 import com.facebook.react.ReactNativeHost;
 import com.facebook.react.ReactPackage;
 import com.facebook.react.shell.MainReactPackage;
 import com.facebook.soloader.SoLoader;

 import java.util.Arrays;
 import java.util.List;

 public class MainApplication extends NavigationApplication {

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return true;
     }



     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             // eg. new VectorIconsPackage()
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
 }