from django.shortcuts import render,redirect
from django.http.response import JsonResponse

from django.views import View
from .models import Topic
from .forms import TopicForm

class BbsView(View):

    def get(self, request, *args, **kwargs):

        topics  = Topic.objects.all()
        context = { "topics":topics }

        return render(request,"bbs/index.html",context)

    def post(self, request, *args, **kwargs):

        json    = { "error":True }

        form    = TopicForm(request.POST,request.FILES)

        if form.is_valid():
            print("OK")
            json["error"]   = False
            form.save()
        else:
            print("NG")


        return JsonResponse(json)

index   = BbsView.as_view()

