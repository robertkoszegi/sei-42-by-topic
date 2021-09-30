# Django Day 0 Key Concepts
Consider this document a refresher or overview of what you should be getting out of the lecture and Django Tutorials. This isn't a replacement for the tutorials, and you should still do as many of them as you can to understand the points presented here.

I'll focus on the parts that are different than what we're used to in Express, and highlight differences.

## MVC vs MVT
Django uses what it calls an MVT (Model, View, Template) architecture. Its comparable to MVC, but with different terminology.

This chart compares MVC to Django's MVT:

| Concern | MVC | Django<br>MVT |
|---|:-:|:-:|
| Database access | Model | Model |
| Code mapped to routes | Controller | View |
| Rendering of dynamic HTML | View | Template |


## Projects vs Apps
A **project** in Django refers to the overall application or web app, where as an **app** is comparable to a module or a plugin, a reusable piece of functionality that can be used in multiple projects.

Projects can have many apps, and apps can be in many different projects.

## Creating a Project and App
Creating a new project:
```
$ django-admin startproject mysite
```

Creating a new app:
```
$ python manage.py startapp polls
```

## DB Setup
We're gonna stick mostly to PostgreSQL for this course, but by default Django uses SQLite, a simplified SQL database. To setup PostgreSQL, we'll need to make sure we first setup our DB after creating a new project:
```
$ psql
# CREATE DATABASE dbname;
```

We'll also need to install a library to connect Django to PostgreSQL, `psycopg2`:
```
$ pip3 install psycopg2-binary
```

And then once we've created the project, switch over a couple `DATABASES` settings in `settings.py`:
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'dbname',
    }
}
```

## Starting the Server
```
$ python manage.py runserver
```

## urls.py
In Django, files named `urls.py` are where we'll be defining our routes. Routes are composed of only URLs without HTTP methods unlike Express.

Our overall project will have a `urls.py` project which generally will namespace and link to various apps our project uses, sort of like a main router.

Our apps will also have their own `urls.py` for routes specific to that particular app.

## Migrations
Django manages database schema changes through scripts called migrations. Migrations are a running list of changes to your DB schema overtime, kind of like a git history. Migration files are generated automatically based on your model definitions whenever you run:
```
$ python manage.py makemigrations appname
```

To apply these schema changes to your DB after generating migration files, run:
```
$ python manage.py migrate
```

Django will keep track of what migrations have been run and which haven't, so you can run this multiple times without worrying about old migration files being run again.

In general you shouldn't edit these files, and you shouldn't remove them either. Just let Django take care of this as much as possible.

## Admin App
Django ships with an admin interface prepackaged and configured you can use to manage the DB.
You can generally access it by default at `http://localhost:8000/admin`.

Logging in requires a superuser account, which you can create from your terminal with:
```
$ python manage.py createsuperuser
```

## Dynamic vs Static URLs
Like with Express, Django allows us to include dynamic portions in our routes that will be filled in at the time of a request based on what's in the URL. Here's an example of static and dynamic URLs in Django:
```py
urlpatterns = [
    # ex: /posts/
    path('posts/', views.index, name='index'),
    # ex: /posts/5/
    path('posts/<int:post_id>/', views.show, name='show'),
    # ex: /posts/5/comments/
    path('posts/<int:post_id>/comments/', views.comments, name='comments')
]
```

## Django Templates
Django provides us with a templating language out of the box, similar to EJS in Express. Its conceptually similar to EJS, but with somewhat different syntax than we're used to. You can learn more about Django template syntax [here](https://docs.djangoproject.com/en/3.0/topics/templates/#the-django-template-language).

## Tutorial Parts 4-7
These are more advanced topics, and the concepts here will covered in future lectures, but just to give you an overview of what each is about:
+ Tutorial 4: Forms and Generic Views
+ Tutorial 5: Testing
+ Tutorial 6: CSS and Static Files
+ Tutorial 7: Customizing the Admin Interface
