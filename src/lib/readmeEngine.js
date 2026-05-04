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
  const { name, subtitle, currentWork, currentWorkLink, learning, skills, socials, email, funFact } = data;

  let readme = '';

  // 1. Header
  readme += `# Hi 👋, I'm ${name || 'Developer'}\n`;
  if (subtitle) {
    readme += `### ${subtitle}\n`;
  }
  readme += '\n';

  // 2. Current Work
  if (currentWork) {
    readme += `## 🔭 Current Work\n`;
    if (currentWorkLink) {
      readme += `- [${currentWork}](${currentWorkLink})\n\n`;
    } else {
      readme += `- ${currentWork}\n\n`;
    }
  }

  // 3. Learning
  if (learning) {
    readme += `## 🌱 Learning\n- ${learning}\n\n`;
  }

  // 4. Skills
  if (skills && skills.length > 0) {
    readme += `## 💬 Ask me about\n`;
    readme += `- ${skills.join(', ')}\n\n`;
  }

  // 5. Reach Me
  if (email) {
    readme += `## 📫 Reach Me\n- ${email}\n\n`;
  }

  // 6. Connect With Me
  if (socials && socials.length > 0) {
    readme += `## 🌐 Connect With Me\n`;
    socials.forEach(social => {
      readme += `- [${social.platform}](${social.url})\n`;
    });
    readme += '\n';
  }

  // 7. Fun Fact
  if (funFact) {
    readme += `## ⚡ Fun Fact\n${funFact}\n`;
  }

  return readme;
}
