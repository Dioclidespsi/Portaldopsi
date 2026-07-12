export interface CourseModuleFiles {
  deck?: string;
  avaliacao?: string;
  exercicios?: string;
  roteiro?: string;
}

export interface CourseModule {
  slug: string;
  moduleNumber: string;
  title: string;
  files: CourseModuleFiles;
}

export interface CourseBlocoManifest {
  number: number;
  title: string;
  free: boolean;
  bundleOnly: boolean;
}

export interface CourseBloco extends CourseBlocoManifest {
  modules: CourseModule[];
}

export interface CourseManifest {
  slug: string;
  folderName: string;
  title: string;
  description: string;
  /** Ainda não decidido (ver §08 do doc de arquitetura, "comissão do Marketplace") — não inventar valor. */
  priceCents: number | null;
  blocos: CourseBlocoManifest[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  priceCents: number | null;
  blocos: CourseBloco[];
}
