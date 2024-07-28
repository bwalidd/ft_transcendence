from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('profiles.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]



# handler404 = 'profiles.views.error_404'
# handler500 = 'profiles.views.error_500'