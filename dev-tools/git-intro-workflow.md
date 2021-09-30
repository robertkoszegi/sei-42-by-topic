<img src="https://i.imgur.com/ce7PitU.png">

# Intro to Git & Your Class Repo

# Learning Objectives

| Student will be able to: |
|---|
| Describe what a Version Control System is |
| Describe the difference between Git and GitHub |
| Distinguish between local and remote repositories |
| Use basic git commands to create a repo, clone it, and update it |
| Fork & clone the class repo to a computer |
| Use basic git commands to retrieve updates to the class repo |
| Use basic git commands to save work to the fork of the class repo | 

# 1. What is version control, and why should you care?

A Version Control System (VCS) records changes to files over time so that you can recall specific versions later.

It also makes working in teams easier, because it enables developers to submit changes to be merged into the codebase.

More specifically, a VCS allows you to:

- Revert files back to a previous state
- Review changes made over time
- Collaborate on a set of files with others
- Create separate "branches" of the codebase to develop new features on without impacting the "master", or production, branch.

In SEI, we'll be using the world's most popular version control system - [git](https://git-scm.com/).

Git was created by [Linus Torvolds](https://en.wikipedia.org/wiki/Linus_Torvalds) in 2005 to help with the development of his main project at the time - developing Linux.

# 2. Git vs. GitHub

GitHub is not the same as git. **GitHub** is a social network built around git. It has completely changed the way we, as programmers, share and work on code. GitHub is now the largest online storage space of collaborative works, and it works with git in order to keep track of versions, issues, and requests for changes.

GitHub also plays the important role of a cloud-based backup system - a safe place for all your work!  Your code, and the time you spent writing it, is valuable, therefore, you don't want to risk losing it to hardware failure, etc. So we "connect" our local git repo to a "remote" repo on GitHub where we can then "push" code to, and "pull" code from - on demand.

In summary:

- Git provides us with local repositories on our computers
- GitHub provides us with remote repositories stored in the cloud
- A local repository is "linked" to a remote repository by adding a "remote" with this command `$ git remote add <name of remote> <URL of repo on GitHub>`

# 3. Summary of Common Git Commands

By following along today and having done the pre-work, you should now be familiar with basic git commands.

In SEI, you'll get plenty of practice using git, especially during project week because each of your projects will be stored in its own directory and will be made a git repository in that directory tracking the changes.

> IMPORTANT: At some point, you will lose access to the class repo that's hosted on GA's GitHub Enterprise account. Not to worry.  You will of course have all of the materials and your work stored locally. Additionally, at the end of the cohort, you can simply add a new remote that links a repo on your personal GitHub account and push to it - that remote repo will then contain all materials and commits for your labs, practice exercises, code challenges, etc.

For your convenience, there is a git command cheatsheet located in the `resources` section of the class repo. However the following summary of commands will "git" you far:

| Command | Purpose |
|---|---|
| `git init` | Initializes a local repository. Used in lieu of cloning a GitHub repo. All local repos contain a hidden `.git` directory responsible for holding repo-related data. |
| `git status` | Checks and reports on the status of your repo. It will inform you what changes to tracked (staged) files will be included in next commit, if there are any untracked files that have been added to the project or have changes, etc. |
| `git add <path>` | Adds an entire directory or individual file (or files using a `*` as a wildcard) to the "staging area" for the next commit. |
| `git add -A`| Adds all changes within the repo to the staging are for next commit. |
| `git commit -m "<message>"`| Commits all staged changes to the local repo. The message should be in worded such that it describes what the commit **does**, not what it **did**. For example, "Style nav bar" instead of "Styled nav bar".|

This following diagrams the flow of making changes to a repo:
 
<img src="https://i.imgur.com/MGQoFYo.png">

This is the basic git/GH workflow.  Things get a bit more complex when you start sharing code and manage larger codebases.

> IMPORTANT: Do not create a repo within an existing repo!  If you find your computer very sluggish, it might be because you have "nested" repos. It's not uncommon for students to accidentally make their home folder (`~`) a repo - so start there if you suspect something is wrong.

<hr>


# 4. Basic Workflow Overview: When the repo owner trusts you! (Or IS you!)

If you are a collaborator with "write" access to a repo, using git is pretty easy! 
The basic workflow is to: 
1. Clone (only once)
2. Synchronize
3. Save to cloud with a 3-step process of: Add, Commit, Push

We can try it out by going to github.com and <strong>creating a new remote repository with a README.md file in it</strong>. Once your remote repo is setup with a .md file, start by: 

```cd``` -ing in terminal to a location where you <strong>don't already</strong> have a git repo setup. (Tip: You can do a ```git status``` to see if you are already in a git repo, or not. The messages are different if you are vs. if you aren't.)

### Basic Workflow Pt. 1 of 3: Clone

Now, start by cloning the remote repository to your computer. As mentioned, you only do this once in order to have a local copy you can work with:

```git clone https://........insert git repo url here.......```

Type ```ls``` to verify that it was downloaded. If there was an error, check the syntax and try again.

Once you've cloned the repo, you now have a new folder on your computer. This is called a local copy, and it is connected to the remote copy, as will see shortly. You can access the local copy using your Finder or file explorer or terminal. 

Let's ```cd``` into our newly created repo folder, and let's check if we have a remote connection by doing:

```git remote -v```

You should see that your local copy has 2 remote connections to a remote location called <strong>origin</strong>. This is good. This is the way.

### Basic Workflow Pt. 2 of 3: Synchronize

Now, go ahead and make some changes (add some files, modify some files, or delete some files inside this folder). Now let's save our work using 3 git commands in sequence: <strong>add, commit, and push.</strong> But wait... 

- what if other people have modified the remote copy? 
- What if all my local files are out of date? 
- Am i going to be destroying other people's work if i save?

#### NOTE: Pull before Pushing!

Those questions were rhetorical. Yes, before you push things, you want to make sure your local copy is synchronized with the remote copy. After all, since the time that you've cloned it, other people may have made changes or edits to the repository. 

Before you push your work, you will want to ```pull``` to download any work that other people have done by typing:

```git pull origin main``` or

```git pull origin master``` depending on what branch is the default. By default, github.com creates a branch called "main" but github enterprise hasn't caught up and still calls it "master".

<strong>Fun note about Vim</strong>: if you ever pull after someone's modified the remote, you will get into a screen with an ancient and powerful editor called <a href="https://en.wikipedia.org/wiki/Vim_(text_editor)">Vim</a>. Vim is famously difficult to exit. To accept the merge and get out of the screen, type ```:wq``` to <a href="https://itsfoss.com/how-to-exit-vim/">exit vim</a>.

### Basic Workflow Pt. 3 of 3: Save (Add, commit, push.)

Now that you've clone and made changes and synchronized, you can save your changes! Every time you want to save your changes, you will do the following in sequence:

1. stage your changes to the staging area:

```git add .```

2. commit(save) your work locally:

```git commit -m 'deleting readme.md and adding a file'```

<strong>Another fun note about Vim</strong>: if you ever omit the -m message, you will get into a screen with an ancient and powerful editor called <a href="https://en.wikipedia.org/wiki/Vim_(text_editor)">Vim</a>. Vim is famously difficult to exit. To get out of the screen, type ```:wq``` to <a href="https://itsfoss.com/how-to-exit-vim/">exit vim</a>.

Third, push(save your work to the remote):
```git push origin main``` or
```git pull origin master``` depending on what branch is the default. By default, github.com creates a branch called "main" but github enterprise hasn't caught up and still calls it "master", which is a little outdated.

Verify that you can see your changes on the github.com webpage. Every time you want to save changes from your local copy to your remote copy, whether you're deleting a file, or adding a file, or editing a file, you will do this 3-step process of:

1. ```git add .``` or more generally ```git add <stuff we want to stage>```
2. ```git commit -m "my message"```
3. ```git push origin main``` or more generally ```git push <remotename> <branchname>```

(after synchronizing with a pull, of course). Try it again. Make some more changes, and then synchronize, and then add, commit, push.

### Basic Workflow: Summary of steps

In summary:

1. clone: when we want to setup a local connection to our remote repo, we will first ```git clone https://... insert repo url here...``` and our local copy will be created
2. modify: we can then modify our local copy to our heart's content.
3. synchronize: we will do a ```git pull origin main``` to sync up our changes with our partners
4. save: we will do our 3 step process of:

- ```git add .``` or more generally ```git add <stuff we want to stage>```
- ```git commit -m "my message"```
- ```git push origin main``` or more generally ```git push <remotename> <branchname>```

5. we will repeat steps 2-4 for the duration of our project.

### Basic workflow: Limitations

This workflow for simplicity skips the idea of branching, and also only works for repos where our collaborators trust us to have "write"(push) access. This isn't always the case, as we will see when we continue this lesson to clone our class repo, or the daily code challenges repo.

## Basic Workflow: Practice!!

Get into your deliverables repo, and follow the instructions above to clone it to a location where you <strong>don't already</strong> have a git repo setup. (Tip: You can do a ```git status``` to see if you are already in a git repo, or not. The messages are different if you are vs. if you aren't.)

You should make a file with your name in it, and save it, following the instructions above.

<hr>

# 5. Trust issues: When the repo owner doesn't trust you

Sometimes, you don't have "push" or "write" access to a repository, as in our class notes repo. You can still clone, but you can't push. All large open source projects are like this, such as the VSCode project, or the Chromium web browser.

So how can we save our changes? Introducing: <strong>fork and clone</strong> workflow.....

## Fork & Clone the Class Repo

This would be a great time to get your computer connected to the class repo where lessons, labs, etc. will be stored.

The README of the class repo describes the workflow and commands you will use to obtain the content of the class repo. Browse there now - your instructor will Slack the link in case you don't have it.

After examining the repo's overall structure, we'll review and follow the instructions laid out in the section entitled **Becoming Familiar With the GitHub Workflow**.

## Saving Your Work on Exercises, Labs, etc.

You will want to save work that you've completed during code alongs, labs, etc.

In fact, you may not be able to pull changes added to the class repo by your instructors until you save your work/changes by committing them like we saw earlier:

```sh
$ git add -A
$ git commit -m "Add amazing work..."
```

## Fork & Clone the Daily Code Challenges Repo

Let's practice forking, cloning and saving work to a repo by setting up and completing today's Daily JS Code Challenge!

1. First, browse [here](https://git.generalassemb.ly/sei-toronto/daily-code-challenges).
2. Now let's follow the instructions and set up the repo.
3. Move to the `daily-code-challenges` directory.
4. Open in VS Code:  `$ code .`
5. Edit the `challenges.js` file to solve the `01-addOne` challenge.
6. Be sure you have saved the changes in your code editor (`command-s` will do the trick).
7. Now let's commit the changes:
	- `$ git add -A`
	- `$ git commit -m "Solve 01-addOne code challenge`  - saves the changes to the local repo
	- `$ git push origin master` - saves the commit to the remote GHE repo (your fork)
8. Now's the time to provide your instructors with the link to your `daily-code-challenges` repo - please respond the to slack message with the URL in your address bar. Note that this only has to be done once.

Congrats on solving the first daily code challenge, saving your changes to the local repo and pushing it to the cloud!

