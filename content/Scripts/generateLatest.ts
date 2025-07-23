import { writeFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  GetAllBlogNames,
  GetBlog,
  GetNowBlog,
  GetProject,
  GetProjectList,
} from '~/Utils/mdx.server';
import type { blogPage } from '~/routes/blogs/blogs';
import type { projectProps } from '~/routes/projects/projects';

async function getLatestProject() {
  const projectList = GetProjectList();
  let latestProject = null;
  for (let projectFile of projectList) {
    const { frontmatter } = await GetProject<projectProps>(projectFile);
    if (!latestProject)
      latestProject = { ...frontmatter, Filename: projectFile };
    else if (new Date(latestProject.Date) < new Date(frontmatter.Date))
      latestProject = { ...frontmatter, Filename: projectFile };
  }
  return latestProject;
}

async function getLatestBlog() {
  const BlogList = GetAllBlogNames();
  let latestBlog = null;
  for (let BlogFile of BlogList) {
    const { frontmatter } = await GetBlog<blogPage['frontmatter']>(BlogFile);

    if (!frontmatter.date)
      throw Error('Forgot to add date field in blog : ' + frontmatter.FileName);

    if (!latestBlog) {
      latestBlog = { ...frontmatter, FileName: BlogFile };
    } else if (
      // this to prevent type error
      latestBlog.date &&
      new Date(latestBlog.date) < new Date(frontmatter.date)
    ) {
      latestBlog = { ...frontmatter, FileName: BlogFile };
    }
  }
  return latestBlog;
}

async function getCurrently() {
  const { frontmatter } = await GetNowBlog<blogPage['frontmatter']>();
  return frontmatter;
}

async function main() {
  const [latestProject, latestBlog, currently] = await Promise.all([
    getLatestProject(),
    getLatestBlog(),
    getCurrently(),
  ]);

  if (!latestProject || !latestBlog || !currently) {
    throw new Error('One or more promises returned null');
  }

  const latestJson = {
    project: {
      img: {
        src: latestProject.Image,
        alt: latestProject.Title + ' Screen Shot',
      },
      title: 'Latest Project',
      heading: latestProject.Title,
      description: latestProject.Description,
      link: `/projects/${latestProject.Filename.substring(0, latestProject.Filename.indexOf('.'))}`,
    },
    blog: {
      img: {
        src: latestBlog.ImageURL,
        alt: latestBlog.title + ' Screen Shot',
      },
      title: 'Latest Blog',
      heading: latestBlog.title,
      description: latestBlog.description,
      link: `/blogs/${latestBlog.FileName.substring(0, latestProject.Filename.indexOf('.'))}`,
    },
    currently: {
      img: {
        src: currently.ImageURL,
        alt: currently.title + ' Screen Shot',
      },
      title: 'Currently...',
      heading: currently.title,
      description: currently.description,
      link: `/currently`,
    },
  };

  // write to json.
  const jsonData = JSON.stringify(latestJson, null, 2);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fullPath = path.join(__dirname, '../latest.json');

  writeFileSync(fullPath, jsonData, 'utf8');

  console.log('Latest JSON file written!');
}

main();
