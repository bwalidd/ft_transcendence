from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('profiles.urls')),
    path('api/auth/', include('account.urls',namespace='account')),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



# handler404 = 'profiles.views.error_404'
# handler500 = 'profiles.views.error_500'