export function generateReadme(data) {
  const { title, description, projectType, features, techStack } = data;

  let readme = '';

  // 1. Header
  readme += `# ${title || 'Project Title'}\n\n`;

  // 2. Badges
  if (techStack && techStack.length > 0) {
    readme += generateBadges(techStack) + '\n\n';
  }

  // 3. Description
  if (description) {
    readme += `## 📖 Description\n\n${description}\n\n`;
  }

  // 4. Features
  if (features && features.length > 0) {
    readme += `## ✨ Features\n\n`;
    features.forEach(feature => {
      readme += `- ${feature}\n`;
    });
    readme += '\n';
  }

  // 5. Tech Stack
  if (techStack && techStack.length > 0) {
    readme += `## 🛠️ Tech Stack\n\n`;
    techStack.forEach(tech => {
      readme += `- ${tech}\n`;
    });
    readme += '\n';
  }

  // 6. Conditional Sections based on Project Type
  if (projectType === 'api') {
    readme += `## 🔌 API Endpoints\n\n`;
    readme += `### GET /api/status\n- Description: Returns API status\n- Response: \`200 OK\`\n\n`;
  }

  if (projectType === 'web' || projectType === 'frontend') {
    readme += `## 📱 UI Previews\n\n`;
    readme += `*Add screenshots of your UI here*\n\n`;
  }

  // 7. Installation
  readme += `## 🚀 Installation\n\n`;
  readme += `\`\`\`bash\ngit clone https://github.com/user/repo.git\ncd repo\nnpm install\nnpm run dev\n\`\`\`\n\n`;

  // 8. License
  readme += `## 📄 License\n\nMIT License\n`;

  return readme;
}

function generateBadges(stack) {
  return stack.map(tech => 
    `![${tech}](https://img.shields.io/badge/${encodeURIComponent(tech)}-blue?style=for-the-badge)`
  ).join(' ');
}
