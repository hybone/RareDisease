# Chapter 1 System Overview
## System Introduction

Against the backdrop of rapid advancements in modern medicine, rare diseases remain a critical yet widely neglected global health issue. Due to their low prevalence, diverse types, and limited clinical experience, patients with rare diseases face numerous challenges in diagnosis, treatment, and psychological support.
To better connect patients, doctors, and relevant professional resources, we have designed and developed the Rare Disease AI Encyclopedia System, an AI-driven platform dedicated to creating a multi-role, data-intelligent, and information-secure knowledge and communication ecosystem.

### 1. System Positioning and Objectives

This system integrates “patient community interaction,” “medical knowledge access,” “AI-assisted decision-making,” and “professional doctor recommendation” into a comprehensive platform. It aims to provide patients and their families with authoritative, personalized, and real-time services, while also serving as a bridge for doctors to exchange experiences and communicate with patients.
The platform targets five types of users: general users, patients, doctors, patient family members, and administrators. Each user type has specific permissions and interactive functions to ensure precision and personalization of services.

### 2. User Management and Role Permissions

General Users: Only need to register a nickname and avatar to browse and post content. Suitable for the general public and volunteers.

Patients: Required to provide a nickname, age, disease information, and avatar. Based on disease data, the system offers customized knowledge recommendations and intelligent doctor matching.

Doctors: Must submit their name (e.g., “Dr. Wang”), avatar, professional title, specialty areas, and a detailed personal introduction. After verification, doctors can provide consultation services and participate in medical content review.

Patient Family Members: Similar to patients, required to fill in nickname, patient’s age, and disease information. The system recommends related resources, patient stories, and doctors based on the input.

Administrators: Possess full management privileges, including reviewing posts and comments, accessing user and message data, and maintaining the accuracy and compliance of AI encyclopedia content.

### 3. Core Functional Modules

Community Interaction Module (Homepage + Posting):
Users can post four types of content — daily sharing, help requests, recovery stories, and event announcements. Each post includes a title, text, and image uploads. All posts must be approved by administrators to ensure professionalism and safety.
Comments support text-only replies and also require approval to prevent misinformation.
A private messaging module allows one-on-one communication between patients, doctors, and peers, ensuring privacy and preventing harassment or data leakage. Clicking a user’s avatar opens their profile page and enables private chat requests.

AI Doctor Recommendation Module:
Based on the disease information entered by patients or family members, the system uses intelligent matching algorithms to recommend suitable doctors. The recommendation considers multiple factors including the doctor’s specialty, past successful cases, and activity level.

AI Encyclopedia Module:
Powered by natural language processing and a medical knowledge graph, this dynamic Q&A system allows users to input background information (such as personal data, hospital records, or patient organization info) before asking questions.
The AI engine, leveraging large-model reasoning and disease-specific keywords, generates detailed medical explanations and advice, while also suggesting related articles and institutional resources.

### 4. Technical Features and Innovations

AI-Driven Q&A Engine: Combines medical large models and user profiles for deep semantic analysis, enabling personalized medical knowledge recommendations.

Fine-Grained Multi-Role Management: Adjusts functions and data visibility dynamically based on user identity, ensuring transparent and efficient platform governance.

Data Security and Privacy Protection: Complies with national cybersecurity and data regulations, encrypting user information to ensure security and trustworthiness.

Scalable Content Framework: Future integration with more patient organizations, research institutions, and medical databases will enrich the platform’s content and professional value.

### 5. Application Prospects and Social Value

The Rare Disease AI Encyclopedia System is not only an information aggregation platform but also a bridge connecting medical experts, the public, and patients with resources. Through intelligent recommendation and knowledge-based Q&A, it enhances the efficiency and reach of rare disease education and diagnosis.
The community and communication features offer emotional support and shared experiences for patients and families. With growing data and evolving AI capabilities, the system can expand into areas such as personalized treatment planning and diagnostic assistance—becoming a key digital infrastructure in the rare disease domain.

## System Features

The Rare Disease AI Encyclopedia System integrates artificial intelligence and healthcare services, forming a multi-role collaborative and intelligent support platform for rare diseases. It supports various users—patients, doctors, family members, and administrators—offering personalized functions based on user identity.
The AI encyclopedia module generates precise medical explanations and personalized advice using user background data, while the doctor recommendation system employs tag matching and historical data to find the best experts.
The community section implements graded content moderation—posts and comments require approval to ensure professionalism. Private messaging guarantees communication privacy and fosters one-on-one interaction.
Emphasizing data security and user experience, the system is suitable for patient education, medical communication, and supportive services. Future expansions include integration with hospitals, patient organizations, and research institutions, building a robust medical knowledge network and service ecosystem.

## Operating Environment

CPU: Android devices recommended with octa-core processors (e.g., Snapdragon 660 or above); iOS A10 or newer (e.g., iPhone 7 or later)

Memory: 2GB RAM

Storage: 200MB available space

Operating System: Android 8.0 (Oreo) or higher; iOS 12 or higher

Database: WeChat Cloud Development Database

# Chapter 2 System Functions
## Registration and Login

### Identity Selection
Users can choose a registration identity: Patient, Doctor, or Volunteer.

### Patient Registration
If selecting Patient, users must provide a nickname, disease, age, and upload an avatar. After agreeing to the privacy policy, click “Register and Log In.”

### Doctor Registration
If selecting Doctor, users must provide a nickname, professional identity, specialty area, and personal introduction, then upload an avatar. After agreeing to the privacy policy, click “Register and Log In.”

### Volunteer Registration
If selecting Volunteer, users need only provide a nickname, age, and avatar. After agreeing to the privacy policy, click “Register and Log In.”

## Homepage
### AI Q&A Module

After successful registration, users are automatically redirected to the homepage, which consists of two main sections.
The first section is the AI Q&A entry, as shown below:

### Information Posting Module

The second section is the Information Posting Page, as shown below:

## AI Intelligent Q&A Module

When users click the question box in the AI Q&A entry on the homepage, they are automatically redirected to the AI Q&A Page.
The AI module analyzes the disease information entered by the patient or family member and uses an intelligent matching algorithm to recommend suitable doctors.
The recommendations are based on multiple dimensions, including the doctor’s area of expertise, past successful cases, and activity level.

The AI Encyclopedia Module adopts natural language processing (NLP) and a medical knowledge graph to construct a dynamic Q&A system.
Before asking a question, users must provide background information such as personal data, hospital records, or patient organization details.
The AI engine, driven by a large-model reasoning mechanism and disease-specific keywords, generates comprehensive medical explanations and advice for the user, while also recommending related articles and institutional resources.

## Community Module
### Post Creation Function

In the second section of the homepage, users can publish four types of posts:

1. Daily sharing

2. Help requests

3. Recovery stories

4. Event announcements

Each post includes a title, main text, and image uploads.
All content must be reviewed and approved by an administrator before publication to ensure professionalism and safety.

### Information List

Published posts are displayed in the Information List Page with brief summaries.
Users can click on any post to view more detailed information.

### Information Details

When a user clicks on a specific post, they are redirected to the Details Page, which displays the full title, content, author, and all uploaded images.

### Comment Function

Users can post text-only comments in the comment section to enhance interaction and engagement among users.

### Private Messaging Function

The Private Messaging Module supports one-on-one communication, allowing private conversations between patients, doctors, and peers.
By clicking on any post author’s avatar, users can visit their profile page and initiate a private chat request.
The system ensures communication privacy and prevents harassment or information leakage.

# 第一章  系统简介

## 系统简介
在现代医学快速发展的背景下，罕见病仍然是全球范围内被广泛忽视的重要健康议题。由于其发病率低、病种繁多、诊疗经验不足等原因，罕见病患者在诊断、治疗、心理支持等方面面临诸多挑战。为了更好地连接患者、医生与相关专业资源，我们设计并开发了罕见病AI百科全书系统，以人工智能为核心驱动力，致力于打造一个多角色参与、数据智能驱动、信息安全可信的知识服务与交流平台。
#### 一、系统定位与目标
本系统是一款集“患者社区交流”、“医学知识获取”、“AI辅助决策”、“专业医生推荐”于一体的综合性平台，旨在为患者及其家属提供权威、个性化、实时响应的服务，同时为医生搭建经验交流与患者沟通的桥梁。系统面向五类用户：普通用户、患者、医生、患者家属与管理员，每类用户具备相应权限与交互功能，确保服务的精准化与个性化。
### 二、用户管理与角色权限
普通用户只需注册昵称与头像即可浏览内容并发布帖子，适用于公众、志愿者等。患者需填写昵称、年龄、所患病症与头像信息。系统将基于其病症信息提供定制化知识推送、推荐匹配医生等功能。医生注册时需提交姓名（如“王医生”）、头像、职级、擅长领域及详细个人介绍。经平台认证后可提供咨询服务并参与医学内容审核。患者家属与患者相似，需填写昵称、患者年龄与所患病症。系统可根据输入的信息推荐相关资源、病友案例与医生。管理员拥有全局管理权限，包括审核帖子与评论、查看全站用户与消息信息、维护AI百科内容的准确性与合规性。
### 三、核心功能模块
社区交流模块（首页+发帖）：用户可发布四类帖子：日常分享、求助信息、治愈样例、组织活动。发帖内容包括：标题、正文、图片上传。所有内容需经管理员审核后方可展示，保障内容专业性与安全性。评论功能支持纯文字回复，同样需要审核，防止不实信息传播。私密消息模块支持一对一消息交流，便于患者与医生、病友之间的私密沟通。点击任意发帖人头像可进入其主页，并发起私聊请求。系统保障通信隐私，防止骚扰或信息泄露。
AI医生推荐模块系统根据患者或家属填写的病症信息，调用智能匹配算法，推荐适合的医生。推荐依据包括医生的擅长领域、历史成功案例与活跃度等多维度数据。AI百科全书模块采用自然语言处理技术与医学知识图谱构建动态问答系统。用户提问前需提供背景信息，包括：自身数据、医院记录、患者组织信息等。AI引擎会基于大模型推理机制，结合病症关键词，为用户生成详尽的医学解读与建议，同时推荐相关文章与机构资源。
### 四、技术特点与创新点
AI驱动的问答引擎：结合医学大模型与用户画像进行深度语义分析，实现“因人而异”的医学知识推荐。多角色精细管理：根据用户身份动态调整功能与数据可见性，实现平台治理透明高效。数据安全与隐私保护：平台将遵循国家网络安全与数据合规要求，对用户隐私信息加密处理，确保合规可信。可扩展的内容体系：未来可接入更多患者组织、科研机构与医疗数据库，丰富内容来源，提升平台专业性与影响力。
五、应用前景与社会价值
罕见病AI百科全书系统不仅是一个信息聚合平台，更是连接医学专家与社会公众、患者与资源之间的桥梁。通过智能推荐与知识问答系统，提升罕见病诊疗科普的效率与广度；通过社区与交流功能，为患者和家属提供情感支持与经验分享的空间。随着数据积累和AI能力持续进化，系统未来可延伸至个性化治疗方案建议、辅助诊断等应用领域，成为罕见病领域的重要数字化基础设施。

## 系统特色
罕见病AI百科全书系统融合人工智能与医疗服务，构建多角色协同、智能交互的罕见病支持平台。系统支持患者、医生、家属、管理员等多类用户，根据身份动态提供专属功能与服务。AI百科模块基于用户背景信息，精准生成医学解释与个性化建议；医生推荐系统则依托标签匹配与历史数据，为患者智能匹配最合适的专家。社区板块实现内容分级管理，所有帖子与评论需审核发布，确保平台内容专业可信；私密消息机制保障患者隐私，促进一对一深度交流。系统注重数据安全与用户体验，适用于患者教育、医学传播与支持性服务。未来可拓展接入医院、患者组织与科研机构数据，形成强大的医学知识网络与服务生态。

## 运行环境
CPU：Android建议搭载 八核处理器（如 Snapdragon 660 及以上）；iOSA10 及以上芯片（如 iPhone 7 或更新机型）
内存：2GB RAM
硬盘：200MB 可用空间
操作系统：Android 8.0（Oreo）及以上版本，iOS 12 及以上版本
数据库：微信云开发数据库 


# 第二章  系统功能

## 注册与登录
### 注册身份选择
用户可以选择注册身份，包括患者，医师或志愿者

### 患者注册
如果登录身份选择为患者，则需要填写昵称、所患病症、年龄，并上传头像，最后同意用户隐私条款后，点击注册并登录。

### 医师注册
如果登录身份选择为医师，则需要填写昵称、身份、擅长领域、个人介绍信息，并上传头像，最后同意用户隐私条款后，点击注册并登录按钮。

### 志愿者注册
如果登录身份选择为志愿者，则仅需要填写昵称、年龄，并上传头像，最后同意用户隐私条款后，点击注册并登录按钮。

## 首页
### AI问答模块
注册成功后，将自动跳转到首页，首页包含两个部分，第一个是AI问答入口，展示如下图：

### 信息发布模块
第二个部分为信息发布页面，展示如下图：

### AI智能问答模块
用户在首页AI问答入口点击提问框后，将自动跳转到AI问答页面。AI模块系统根据患者或家属填写的病症信息，调用智能匹配算法，推荐适合的医生。推荐依据包括医生的擅长领域、历史成功案例与活跃度等多维度数据。AI百科全书模块采用自然语言处理技术与医学知识图谱构建动态问答系统。用户提问前需提供背景信息，包括：自身数据、医院记录、患者组织信息等。AI引擎会基于大模型推理机制，结合病症关键词，为用户生成详尽的医学解读与建议，同时推荐相关文章与机构资源。

## 社区模块
### 发帖功能
用户可以在首页的第二个部分发布四类帖子：日常分享、求助信息、治愈样例、组织活动。

发帖内容包括：标题、正文、图片上传。所有内容需经管理员审核后方可展示，保障内容专业性与安全性。

### 资讯列表
发布的内容将在资讯列表页展示简要信息，用户可根据信息点击某一条资讯去查看更详细的内容。


### 资讯详情
当用户点击某一条资讯时，将跳转到详情页，展示完整的标题、内容、发布者和所有上传的图片。

### 评论功能
用户可以在页面的评论区发布纯文字评论，提高用户之间的互动性。

### 私信功能
私密消息模块支持一对一消息交流，便于患者与医生、病友之间的私密沟通。点击任意发帖人头像可进入其主页，并发起私聊请求。
