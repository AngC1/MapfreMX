# 🤝 Contributing Guide

Thank you for considering contributing to **Policy Reader API**! This guide will help you understand how to contribute effectively.

---

## 🎯 Types of Contributions

We welcome all types of contributions:

- 🐛 **Bug Reports** - Found an issue? Report it!
- ✨ **Feature Requests** - Have an idea? Suggest it!
- 📝 **Documentation** - Help improve our docs
- 🧪 **Test Cases** - Add comprehensive tests
- 🔧 **Code Improvements** - Refactor or optimize
- 🎨 **UI/UX** - Improve the demo interface

---

## 🚀 Getting Started

### 1. Fork & Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/policy-reader-api.git
cd policy-reader-api
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# Or for bug fixes:
git checkout -b fix/your-bug-fix
# Or for docs:
git checkout -b docs/your-doc-improvement
```

### 3. Set Up Development Environment
```bash
# Follow Quick Start Guide
.\scripts\build.cmd
.\scripts\run-tests.cmd
```

---

## 📋 Before Starting Development

### 1. Read Documentation
- [ ] [README.md](../README.md) - Project overview
- [ ] [Skill.md](../Skill.md) - Main skill documentation
- [ ] [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [ ] [development-guide.md](development-guide.md) - Development standards

### 2. Verify Environment
- [ ] Run [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
- [ ] All tests pass: `.\mvnw clean test`
- [ ] Application starts: `.\mvnw spring-boot:run`

### 3. Understand Code Structure
```
api/
├── PolicyReaderController.java    # HTTP endpoints
├── PolicyReadRequest.java          # Request DTO
└── ApiExceptionHandler.java        # Error handling

application/
├── PolicyReaderService.java        # Business logic
└── PolicyReadResult.java           # Response DTO
```

---

## 💻 Development Workflow

### For New Features

**Step 1: Plan**
```bash
# Create feature branch
git checkout -b feature/new-extraction-rule

# Update documentation first (living docs)
# Edit docs/guides/development-guide.md with your plan
```

**Step 2: Implement**
```bash
# Example: Add new extraction rule
# File: src/main/java/com/ayesa/idp/policyreader/application/PolicyReaderService.java

public PolicyReadResult extractPolicyData(String rawText) {
    // Existing code...
    
    // NEW: Extract your field
    PolicyReadResult result = new PolicyReadResult();
    result.setYourField(extractYourField(rawText));
    
    return result;
}

private String extractYourField(String rawText) {
    // Implementation
    return extractedValue;
}
```

**Step 3: Write Tests**
```bash
# File: src/test/java/com/ayesa/idp/policyreader/application/PolicyReaderServiceTest.java

@Test
public void testExtractYourField() {
    String input = "Your field: value";
    PolicyReadResult result = service.extractPolicyData(input);
    
    assertEquals("value", result.getYourField());
}

@Test
public void testExtractYourFieldWithAlias() {
    String input = "Alternative name: value";
    PolicyReadResult result = service.extractPolicyData(input);
    
    assertEquals("value", result.getYourField());
}
```

**Step 4: Verify Quality**
```bash
# Run tests
.\mvnw clean test

# Check code coverage
.\mvnw jacoco:report

# Verify no warnings
.\mvnw clean compile -q

# Run full build
.\mvnw clean package
```

**Step 5: Document**
- [ ] Update test-data in `resources/test-data/test-cases.json`
- [ ] Update API docs if endpoint changed
- [ ] Update architecture guide if structure changed
- [ ] Add comment in code if logic is complex

---

### For Bug Fixes

**Step 1: Reproduce Bug**
```bash
# Create test case that fails
# Demonstrates the bug
```

**Step 2: Fix Code**
```bash
# Make minimal changes
# Focus on fixing the root cause
```

**Step 3: Verify Fix**
```bash
# Test case now passes
# No regressions in other tests
# .\mvnw clean test
```

**Step 4: Document**
- [ ] Add test case to prevent regression
- [ ] Comment explaining the fix
- [ ] Update CHANGELOG if needed

---

### For Documentation

**Step 1: Choose File**
- Clarification: Edit existing file
- New guide: Create new `.md` file
- Update: Fix accuracy/examples

**Step 2: Edit**
```bash
# Follow Markdown conventions
# Use clear headings
# Include code examples
# Add links to related docs
```

**Step 3: Preview**
```bash
# Review in editor
# Check links work
# Verify formatting
```

---

## ✅ Code Standards

### Java Conventions
```java
// Package naming: reverse domain + purpose
package com.ayesa.idp.policyreader.api;

// Class naming: PascalCase
public class PolicyReaderController {
    
    // Method naming: camelCase
    public ResponseEntity<PolicyReadResult> readPolicy() {
        
        // Variable naming: camelCase
        String policyText = request.getRawText();
        
        // Constants: UPPER_CASE_WITH_UNDERSCORES
        private static final String DEFAULT_ENCODING = "UTF-8";
    }
}
```

### Code Organization
```java
public class PolicyReaderService {
    
    // 1. Constants at top
    private static final String PATTERN = "...";
    
    // 2. Class variables
    @Autowired
    private SomeRepository repository;
    
    // 3. Public methods
    public PolicyReadResult extractPolicyData(String rawText) {
        // Implementation
    }
    
    // 4. Private helper methods
    private String extractField(String rawText) {
        // Implementation
    }
}
```

### Naming Conventions
| Type | Style | Example |
|------|-------|---------|
| Class | PascalCase | `PolicyReaderController` |
| Method | camelCase | `extractPolicyData()` |
| Variable | camelCase | `policyNumber` |
| Constant | UPPER_CASE | `DEFAULT_TIMEOUT` |
| Package | lowercase.separated | `com.ayesa.idp.policyreader` |

### Comments & Documentation
```java
/**
 * Extracts structured policy data from free-text descriptions.
 * 
 * Recognizes multiple field name aliases and calculates confidence
 * based on successfully extracted fields.
 * 
 * @param rawText Free-form policy text (required, non-empty)
 * @return PolicyReadResult with extracted fields
 * @throws IllegalArgumentException if rawText is null or empty
 */
public PolicyReadResult extractPolicyData(String rawText) {
    // Complex logic explanation if needed
    return result;
}
```

---

## 🧪 Testing Requirements

### Unit Test Minimum
- [ ] Test success case
- [ ] Test failure case
- [ ] Test edge cases
- [ ] Test validation
- [ ] Minimum 80% code coverage

### Test Structure
```java
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PolicyReaderServiceTest {
    
    @Autowired
    private PolicyReaderService service;
    
    @Test
    public void testHappyPath() {
        // Given
        String input = "Aseguradora: Mapfre...";
        
        // When
        PolicyReadResult result = service.extractPolicyData(input);
        
        // Then
        assertNotNull(result);
        assertEquals("Mapfre", result.getInsurerName());
    }
    
    @Test
    public void testEdgeCase() {
        // Test boundary conditions
    }
}
```

---

## 📝 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Build, dependencies

### Examples
```bash
git commit -m "feat(extraction): Add policy duration field extraction"
git commit -m "fix(service): Correct date parsing for non-standard formats"
git commit -m "docs: Add contribution guidelines"
git commit -m "test(controller): Add validation error tests"
```

### Commit Best Practices
- [ ] One logical change per commit
- [ ] Descriptive message (50 chars max for subject)
- [ ] Reference issues if applicable: `Fixes #123`
- [ ] Keep history clean (no merge commits)

---

## 🔄 Pull Request Process

### Before Creating PR
- [ ] Run all tests: `.\mvnw clean test`
- [ ] Check coverage: `.\mvnw jacoco:report`
- [ ] Build passes: `.\mvnw clean package`
- [ ] Update documentation
- [ ] Add test cases
- [ ] Commit messages are clear

### Creating PR
```bash
# Push to your fork
git push origin feature/your-feature

# Create PR on GitHub
# Title: Clear and descriptive
# Description: Explain what and why
# Link any issues: Fixes #123, Relates to #456
```

### PR Description Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing performed.

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Tests added
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Follows coding standards
```

### PR Review Process
1. **Automated Checks**
   - Build passes
   - Tests pass
   - No conflicts

2. **Code Review**
   - Architecture review
   - Code standards check
   - Test coverage verification

3. **Approval & Merge**
   - Requires 1+ approval
   - Squash and merge recommended
   - Delete branch after merge

---

## 🚀 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Example: `2.0.1`

### Release Steps
1. Create release branch: `release/2.0.1`
2. Update version in `pom.xml`
3. Update `CHANGELOG.md`
4. Create release PR
5. Tag release on GitHub
6. Deploy artifacts

---

## 📚 Documentation Standards

### Markdown Formatting
```markdown
# Main Title (H1)

## Subsection (H2)

### Sub-subsection (H3)

**Bold text** for emphasis
*Italic text* for emphasis
`code snippets` inline
\`\`\`language
code blocks
\`\`\`

- Bullet point
- Another point
```

### Link Format
```markdown
[Link text](path/to/file.md)
[Link with line](path/to/file.md#L10)
[External link](https://example.com)
```

### Code Examples
- Keep examples focused
- Include expected output
- Provide context
- Update when code changes

---

## 🆘 Getting Help

### Documentation
- [README.md](../README.md) - Project overview
- [Skill.md](../Skill.md) - Complete reference
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [development-guide.md](development-guide.md) - Dev standards

### Communication
- Create GitHub Issue for discussions
- Use PR comments for code review
- Open discussions for design decisions

### Common Issues
- See [development-guide.md#troubleshooting](development-guide.md#troubleshooting)
- See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

---

## 🎯 Contributing Ideas

### High Priority
- [ ] Add database persistence
- [ ] Implement caching layer
- [ ] Add authentication
- [ ] Improve error messages

### Medium Priority
- [ ] Support additional languages
- [ ] Add performance metrics
- [ ] Enhance extraction patterns
- [ ] Improve UI templates

### Low Priority
- [ ] Add more test cases
- [ ] Improve documentation
- [ ] Refactor code comments
- [ ] Add examples

---

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Assume good intentions
- Provide constructive feedback
- Report concerns appropriately

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ✨ Thank You!

Your contributions make Policy Reader API better! 🙏

---

> **Guide Version:** 1.0  
> **Last Updated:** 2026-04-23  
> **Status:** ✅ Active

