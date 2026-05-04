export function generateProjectReadme(data) {
  const { title, description, techStack, features, repoUrl, license } = data;

  let readme = '';

  // 1. Header
  readme += `# 🚀 ${title || 'Project Title'}\n\n`;

  // 2. Description
  if (description) {
    readme += `## 📖 Description\n${description}\n\n`;
  }

  // 3. Tech Stack
  if (techStack && techStack.length > 0) {
    readme += `## ⚙️ Tech Stack\n`;
    techStack.forEach(tech => {
      readme += `- ${tech}\n`;
    });
    readme += '\n';
  }

  // 4. Features
  if (features && features.length > 0) {
    readme += `## ✨ Features\n`;
    features.forEach(feature => {
      readme += `- ${feature}\n`;
    });
    readme += '\n';
  }

  // 5. Project Structure (Mocked for now)
  readme += `## 📂 Project Structure\n\`\`\`\nsrc/\n ├── components/\n ├── pages/\n ├── hooks/\n ├── store/\n\`\`\`\n\n`;

  // 6. Installation
  const defaultRepo = 'https://github.com/user/repo.git';
  readme += `## 🚀 Installation\n\`\`\`bash\ngit clone ${repoUrl || defaultRepo}\ncd repo\nnpm install\nnpm run dev\n\`\`\`\n\n`;

  // 7. License
  if (license) {
    readme += `## 📄 License\n${license}\n`;
  } else {
    readme += `## 📄 License\nMIT License\n`;
  }

  return readme;
}

export function generateProfileReadme(data) {
  let md = ''

  // 1. Header & Title
  if (data.addons?.visitors) {
    const username = data.socials?.find(s => s.platform.toLowerCase() === 'github')?.url?.split('/').pop() || data.name?.replace(/\s+/g, '') || 'username'
    md += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat" alt="${username}" /> </p>\n\n`
  }

  if (data.name) {
    md += `<h1 align="center">Hi 👋, I'm ${data.name}</h1>\n`
  }
  if (data.subtitle) {
    md += `<h3 align="center">${data.subtitle}</h3>\n`
  }

  // Add-ons: Trophy
  if (data.addons?.trophy) {
    const username = data.socials?.find(s => s.platform.toLowerCase() === 'github')?.url?.split('/').pop() || data.name?.replace(/\s+/g, '') || 'username'
    md += `<p align="center"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${username}" alt="${username}" /></a> </p>\n\n`
  }

  // Add-ons: Twitter Badge
  if (data.addons?.twitterBadge) {
    const twitterUrl = data.socials?.find(s => s.platform.toLowerCase() === 'twitter')?.url
    if (twitterUrl) {
      const handle = twitterUrl.split('/').pop()
      md += `<p align="left"> <a href="${twitterUrl}" target="blank"><img src="https://img.shields.io/twitter/follow/${handle}?logo=twitter&style=for-the-badge" alt="${handle}" /></a> </p>\n\n`
    }
  }

  md += `\n---\n\n`

  // 2. Work & About
  if (data.currentWork || data.collab || data.help || data.learning || data.askMe || data.portfolio || data.blog || data.resume || data.email || data.funFact) {
    md += `### 👨‍💻 About Me\n\n`
    if (data.currentWork) {
      md += `- 🔭 I’m currently working on [${data.currentWork}](${data.currentWorkLink || '#'})\n`
    }
    if (data.collab) {
      md += `- 👯 I’m looking to collaborate on [${data.collab}](${data.collabLink || '#'})\n`
    }
    if (data.help) {
      md += `- 🤝 I’m looking for help with [${data.help}](${data.helpLink || '#'})\n`
    }
    if (data.learning) {
      md += `- 🌱 I’m currently learning **${data.learning}**\n`
    }
    if (data.askMe) {
      md += `- 💬 Ask me about **${data.askMe}**\n`
    }
    if (data.portfolio) {
      md += `- 👨‍💻 All of my projects are available at [${data.portfolio}](${data.portfolio})\n`
    }
    if (data.blog) {
      md += `- 📝 I regularly write articles on [${data.blog}](${data.blog})\n`
    }
    if (data.resume) {
      md += `- 📄 Know about my experiences [${data.resume}](${data.resume})\n`
    }
    if (data.email) {
      md += `- 📫 How to reach me **${data.email}**\n`
    }
    if (data.funFact) {
      md += `- ⚡ Fun fact **${data.funFact}**\n`
    }
    md += `\n`
  }

  // 3. Skills
  if (data.skills && data.skills.length > 0) {
    md += `### 🛠 Skills\n\n`
    md += `<p align="left">\n`
    data.skills.forEach(skill => {
      const encodedSkill = encodeURIComponent(skill)
      md += `  <img src="https://img.shields.io/badge/${encodedSkill}-20232A?style=for-the-badge&logo=${encodedSkill.toLowerCase()}&logoColor=61DAFB" alt="${skill}" />\n`
    })
    md += `</p>\n\n`
  }

  // 4. Social Links
  if (data.socials && data.socials.length > 0) {
    md += `### 🤝 Connect with me\n\n`
    md += `<p align="left">\n`
    data.socials.forEach(social => {
      const platform = encodeURIComponent(social.platform)
      md += `  <a href="${social.url}" target="_blank">\n    <img src="https://img.shields.io/badge/${platform}-white?style=for-the-badge&logo=${platform.toLowerCase()}&logoColor=black" alt="${social.platform}" />\n  </a>\n`
    })
    md += `</p>\n\n`
  }

  // 5. Add-ons: Stats Cards
  if (data.addons?.stats || data.addons?.topSkills || data.addons?.streak) {
    md += `### 📊 GitHub Stats\n\n`
    const username = data.socials?.find(s => s.platform.toLowerCase() === 'github')?.url?.split('/').pop() || data.name?.replace(/\s+/g, '') || 'username'
    
    md += `<p align="center">\n`
    if (data.addons?.stats) {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical" alt="GitHub Stats" />\n`
    }
    if (data.addons?.streak) {
      md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical" alt="GitHub Streak" />\n`
    }
    md += `</p>\n\n`

    if (data.addons?.topSkills) {
      md += `<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical" alt="Top Languages" />\n</p>\n\n`
    }
  }

  return md
}
